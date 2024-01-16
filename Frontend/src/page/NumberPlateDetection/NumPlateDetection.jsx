import React, { useEffect, useRef, useState, useCallback } from "react";
import style from "./numPlateDetection.module.css";
import { DetailsContext } from "../../context/DetailsContext";

const NumPlateDetection = () => {
  const inputRef = useRef(null);
  const videoRef = useRef(null);

  const isVideo = useRef(false);

  const [capturing, setCapturing] = useState(false);
  const { evidence, user } = React.useContext(DetailsContext);

  const sendFrameToServer = useCallback(async () => {
    if (videoRef.current && inputRef.current.value.length > 0) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // canvas.toBlob((blob) => {
      //   form.append("image", blob, "frame.jpg");
      // }, "image/jpg");
      const imageBlob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg")
      );
      const formData = new FormData();
      formData.append("image", imageBlob, "frame.jpg");

      const data = await fetch(
        `http://localhost:5000/license-plate-detection?number_plate=${inputRef.current.value}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const response = await data.json();
      if (response?.download_link) {
        const uploadCrime = await fetch(
          "http://localhost:8000/crime/evidence",
          {
            method: "POST",
            body: JSON.stringify({
              image: data.download_link,
              location: {
                latitude: user.camera.cameraLatitude,
                longitude: user.camera.cameraLongitude,
              },
              time: "2021-09-30 12:00:00",
              userid: user._id,
              crime: "Gun detected",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (uploadCrime.status === 200) {
          setCameraEvidence((prev) => [
            {
              image: data.download_link,
              location: {
                latitude: user.camera.cameraLatitude,
                longitude: user.camera.cameraLongitude,
              },
              time: "2021-09-30 12:00:00",
              userid: user._id,
              crime: "Number Plate detected - {}",
            },
            ...prev,
          ]);
        }
      }
    }
  }, []);

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "video/mp4") {
      alert("Please upload a video file.");
      return;
    }
    isVideo.current = true;
    const videoURL = URL.createObjectURL(file);

    videoRef.current.src = videoURL;
    videoRef.current.pause();
    videoRef.current.muted = true;
  };

  const sendPlateNumber = async () => {
    const number_plate = inputRef.current.value;
    if (!number_plate) {
      alert("Please enter a number plate.");
      return;
    }
    if (isVideo.current) videoRef.current.load();
    setCapturing(true);
    // const response = await data.json();
  };

  useEffect(() => {
    if (!capturing) return;
    const intervalId = setInterval(() => {
      sendFrameToServer();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [capturing, sendFrameToServer]);

  const startWebCam = async () => {
    // check if camera is already in use if in use stop the webcam and restart it
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      //stop all tracks
      tracks.forEach(function (track) {
        track.stop();
      });
      //set the srcObject to null
      videoRef.current.srcObject = null;
    }

    // starts the webcam and sends the image to the backend
    try {
      isVideo.current = false;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F8F6F5",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <div className={style.one}>
        <h1 className={style.headline}>Number Plate Detection</h1>
      </div>
      <div className={style.wrapper}>
        <div className={style.video}>
          <h1>CCTV Footage</h1>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", maxWidth: "400px", borderRadius: "5px" }}
          ></video>
          <button onClick={startWebCam}>Start Webcam</button>
          <span className="font-bold">or</span>
          <input type="file" accept="video/*" onChange={handleVideo} />
          <div className={style.input}>
            <input
              style={{
                backgroundColor: "pink",
                width: "200px",
                height: "40px",
                fontSize: "20px",
                padding: "10px",
                borderRadius: "10px",
              }}
              ref={inputRef}
              type="string"
            />
            <button
              style={{
                width: "100px",
                height: "auto",
                padding: "10px",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#1E9010",
                textAlign: "center",
                borderRadius: "10px",
              }}
              onClick={sendPlateNumber}
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumPlateDetection;

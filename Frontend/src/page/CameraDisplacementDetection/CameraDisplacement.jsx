import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./cameraDisplacement.module.css";
import CardEvidence from "../../components/card/CardEvidence/CardEvidence";
import { DetailsContext } from "../../context/DetailsContext";

const CameraDisplacement = () => {
  const videoRef = useRef(null);
  const { evidence, user } = useContext(DetailsContext);

  const [cameraEvidence, setCameraEvidence] = useState([]);

  useEffect(() => {
    const filterEvidences = evidence.filter((item) =>
      item.crime.toLowerCase().includes("displacement")
    );
    setCameraEvidence(filterEvidences);
  }, [evidence]);

  useEffect(() => {
    const startCamera = async () => {
      try {
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

    startCamera();

    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    };
  }, []);

  const sendFrameToServer = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageBlob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg")
      );

      const formData = new FormData();
      formData.append("image", imageBlob, "frame.jpg");

      // Send the image to the Flask backend
      await fetch("http://127.0.0.1:5000/camera-displacement", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.status === "success") {
            console.log(data);
            if (data.camerablocked == "True") {
              const uploadCrime = await fetch(
                "http://localhost:8000/crime/evidence",
                {
                  method: "POST",
                  body: JSON.stringify({
                    image: "https://i.imgur.com/6KUt4Ys.jpg",
                    location: {
                      latitude: user.camera.cameraLatitude,
                      longitude: user.camera.cameraLongitude,
                    },
                    time: new Date()
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " "),
                    userid: user._id,
                    crime: "Camera Displacement Detected",
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(uploadCrime);

              if (uploadCrime.status === 200) {
                setCameraEvidence((prev) => [
                  {
                    image: "https://i.imgur.com/6KUt4Ys.jpg",
                    location: {
                      latitude: user.camera.cameraLatitude,
                      longitude: user.camera.cameraLongitude,
                    },
                    time: new Date()
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " "),
                    userid: user._id,
                    crime: "Camera Displacement Detected",
                  },
                  ...prev,
                ]);
              }
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sendFrameToServer();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#DCF2F1",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <div className={style.one}>
        <h1 className={style.headline}>CCTV Displacement Detection</h1>
      </div>
      <div className={style.wrapper}>
        <div className={style.video}>
          <h1>CCTV Footage</h1>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", maxWidth: "400px", borderRadius: "5px" }}
          />
        </div>
        <div className={style.evidence}>
          {cameraEvidence &&
            cameraEvidence.map((evi, idx) => (
              <CardEvidence key={evi.id} evi={evi} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CameraDisplacement;

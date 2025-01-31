import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { DetailsContext } from "../../context/DetailsContext";
import styles from "./CrimeEvidence.module.css";
import CardEvidence2 from "../../components/card/CardEvidence2/CardEvidence2";
import Loader from "../../components/Loaders/Loader";

const CrimeEvidence = () => {
  const { evidence } = useContext(DetailsContext);
  const [cameraEvidence, setCameraEvidence] = useState([]);

  const categories = [
    {
      img_url: "https://i.imgur.com/7NXZD71.png",
      name: "All",
    },
    {
      img_url: "https://i.imgur.com/7NXZD71.png",
      name: "Gun",
    },
    {
      img_url: "https://i.imgur.com/ViQfcxb.png",
      name: "Fire",
    },
    {
      img_url: "https://i.imgur.com/Z6vk1wg.png",
      name: "Number Plate",
    },
    {
      img_url: "https://i.imgur.com/S5cg6iS.png",
      name: "Criminal",
    },
    {
      img_url: "https://i.imgur.com/6KUt4Ys.jpg",
      name: "Displacement",
    },
  ];

  useEffect(() => {
    setCameraEvidence(evidence);
  }, [evidence]);

  const handleSelection = (e) => {
    const innerText = e.target.innerText.toLowerCase();
    const query =
      e.target.innerText == "Gun"
        ? "Gun detected"
        : e.target.innerText == "Fire"
        ? "Fire detected"
        : e.target.innerText == "Number Plate"
        ? "number"
        : e.target.innerText == "Criminal"
        ? "Criminal detected"
        : e.target.innerText == "Displacement"
        ? "Displacement detected"
        : "all";
    if (query === "all") return setCameraEvidence(evidence);
    else if (query === "number") {
      const filterEvidences = evidence.filter((item) =>
        item.crime.toLowerCase().includes(query)
      );
      setCameraEvidence(filterEvidences);
      console.log(filterEvidences);
    } else if (query === "Displacement detected") {
      const filterEvidences = evidence.filter((item) =>
        item.crime.toLowerCase().includes("displacement")
      );
      setCameraEvidence(filterEvidences);
    } else {
      console.log(query);
      const filterEvidences = evidence.filter((item) => item.crime === query);
      setCameraEvidence(filterEvidences);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#DCF2F1",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <div className={styles.one}>
        <h1 className={styles.headline}>Activity Evidence</h1>
      </div>
      <div className={styles.evidenceContainer}>
        <div className={styles.categories}>
          {categories.map((category, idx) => (
            <div
              key={idx}
              className={styles.category}
              onClick={handleSelection}
            >
              <img
                src={category.img_url}
                alt={category.name}
                className={styles.icon}
              />
              <div>{category.name}</div>
            </div>
          ))}
        </div>
        <div className={styles.evidences}>
          {cameraEvidence.length === 0 && <Loader />}
          {cameraEvidence.map((evi, idx) => (
            // <CardEvidence key={idx} evi={evi} />
            <CardEvidence2 key={idx} evi={evi} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrimeEvidence;

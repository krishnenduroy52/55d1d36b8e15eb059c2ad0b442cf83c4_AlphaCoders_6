import React from "react";
import Card1 from "../../components/card/card1/Card1";
import style from "./adminDashboard.module.css";

// image import
import cctv from "../../assets/cctv.png";
import cctvMap from "../../assets/cctv_map.png";
import trial from "../../assets/trial.png";

const AdminDashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <div className={style.wrapper}>
        <h1 className={style.heading}>Admin Dashboard</h1>
        <div className={style.cardsWrapper}>
          <div className={style.cards}>
            <Card1
              imageLink={cctv}
              text="CCTV Surveillance"
              width=""
              height=""
              to="/admin/view/cctv"
            />
            <Card1
              imageLink={cctvMap}
              text="CCTV Location"
              width="200"
              height="200"
              to="/admin/map"
            />
            <Card1
              imageLink={trial}
              text="Crime Evidence"
              width="200"
              height="200"
              to="/admin/evidence"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

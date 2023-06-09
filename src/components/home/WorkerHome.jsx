import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, WorkerContext } from "../context";

import styles from "./home.module.scss";

const WorkerHome = () => {
  const {  setIsAuth } = useContext(AuthContext);
  const {  setIsWorker } = useContext(WorkerContext);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isWorked, setIsWorked] = useState(false);
  const worker = JSON.parse(localStorage.getItem("worker"));
  const getWorker = async () => {

    const response = await axios.get(
      `https://work-couner-server.onrender.com/api/company-worker?worker_id=${worker.id}`
    );
    setIsWorked(response.data.is_worked);

  };
  const startWork = async () => {
    setIsBtnDisabled(true);
    const response = await axios.post(
      `https://work-couner-server.onrender.com/api/company-workers-start`,
      {
        worker_id: worker.id,
        start_time: Date.now(),
      }
    );
    await getWorker()
    setIsBtnDisabled(false);
  };
  const endWork = async () => {
    setIsBtnDisabled(true);
    const response = await axios.put(
      `https://work-couner-server.onrender.com/api/company-workers-end`,
      {
        worker_id: worker.id,
        end_time: Date.now(),
      }
    );
    await getWorker()
    setIsBtnDisabled(false);
  };
  console.log(isWorked);
  useEffect(() => {
    getWorker();
  }, []);

  return (
    <div className={styles.workerHomeContainer}>
      {!isBtnDisabled && isWorked ? (
        <button
          onClick={endWork}
          disabled={isBtnDisabled}
          className={styles.endBtn}
        >
          Վերջացնել աշխատանքը
        </button>
      ):<div className={`${styles.loader1} ${isBtnDisabled ? "" :styles.hidden}`}></div>}
      {!isBtnDisabled &&
        !isWorked ? (
          <button
            onClick={startWork}
            disabled={isBtnDisabled}
            className={styles.startBtn}
          >
            Սկսել աշխատանքը
          </button>
        ):<div className={`${styles.loader2} ${isBtnDisabled ? "" :styles.hidden}`}></div>}

      <div
        className={styles.outBtn}
        onClick={() => {
          setIsAuth(false);
          setIsWorker(false);
          localStorage.clear();
        }}
      >
        Ելք
      </div>

      {/* {isWorked} */}
      <div className={styles.selectedSection}></div>
    </div>
  );
};

export default WorkerHome;

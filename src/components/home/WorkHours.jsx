import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";

export default function WorkHours() {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [workersHours, setWorkersHours] = useState([]);
  const [workerHours, setWorkerHours] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const company = JSON.parse(localStorage.getItem("company"));

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const date = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  };
  

  const getWorkersHours = async (company_id, year, month) => {
    const response = await axios.get(
      `https://work-couner-server.onrender.com/api/company-workers-hours?company_id=${company_id}&year=${year}&month=${month}`
    );
    console.log(response);
    setWorkersHours(response.data);
    // setWorkerRoles(response.data);
  };
  const getWorkerHours = async (worker_id, year, month) => {
    const response = await axios.get(
      `https://work-couner-server.onrender.com/api/company-worker-hours?worker_id=${worker_id}&year=${year}&month=${month}`
    );
    console.log(response);

    setWorkerHours(response.data);
    setIsModalOpen(true);
  };
  console.log(currentMonth, currentYear);
  useEffect(() => {
    getWorkersHours(company.id, currentYear, currentMonth);
  }, []);

  return (
    <div className={styles.workHoursContainer}>
      <div className={styles.selectContainer}>
        <select
          name="years"
          id="years"
          className={styles.years}
          onChange={(e) => {
            setCurrentYear(e.target.value);
            console.log(e.target.value);
          }}
        >
          {Array.from({ length: currentYear - 2022 }, (_, i) => (
            <option
              value={2023 + i}
              key={2023 + i}
              selected={currentYear === 2023 + i}
            >
              {2023 + i}
            </option>
          ))}
        </select>
        <select
          name="months"
          id="months"
          className={styles.months}
          onChange={(e) => {
            setCurrentMonth(e.target.value);
            console.log(e.target.value);
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option value={i + 1} key={i + 1} selected={currentMonth === i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button
          className={styles.selectBtn}
          onClick={() => {
            getWorkersHours(company.id, currentYear, currentMonth);
          }}
        >
          Հաստատել
        </button>
      </div>
      <div key={Date.now()} className={styles.workerHoursItemHeader}>
        <div className={styles.name}>Աշխատակցի անուն</div>
        <div className={styles.hours}>Աշխատած ժամեր</div>
        <div className={styles.totalPay}>Աշխատավարձը</div>
      </div>
      {workersHours.map((el) => (
        <div key={el.id} className={styles.workerHoursItem}>
          <div
            className={styles.name}
            onClick={() => {
              getWorkerHours(el.id, currentYear, currentMonth);
            }}
          >
            {el.worker_name}
          </div>
          <div className={styles.hours}>{el.total_hours}</div>
          <div className={styles.totalPay}>{el.total_pay}</div>
        </div>
      ))}
      <div
        className={`${styles.workerModal} ${isModalOpen ? "" : styles.hidden}`}
      >
        <div onClick={() => setIsModalOpen(false)} className={styles.backBtn}>Վեադառնալ հետ</div>
      
        <div className={styles.infoContainer}>
        <div className={styles.workerHoursHeader}>
            <div className={styles.name}>
            Անուն
            </div>
            <div className={styles.time}>Աշխատանքի սկիզբ</div>
            <div className={styles.time}>Աշխատանքի վերջ</div>
          </div>
          {workerHours.map( (el, index) => <div className={styles.workerHours}>
            <div className={styles.name}>
            {`${index+1}.  ${el.worker_name} ${el.worker_last_name}`}
            </div>
            <div className={styles.time}>{formatDate(el.start_time)}</div>
            <div className={styles.time}>{formatDate(el.end_time)}</div>
          </div>)}
        </div>
      </div>
    </div>
  );
}

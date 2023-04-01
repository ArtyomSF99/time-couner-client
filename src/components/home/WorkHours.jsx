import axios from "axios";
import React, { useEffect, useState } from "react";

export default function WorkHours() {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1)
  const [workersHours, setWorkersHours] = useState([]);
  const company = JSON.parse(localStorage.getItem("company"));

  const getWorkersHours = async (company_id, year, month) => {
    const response = await axios.get(
      `https://work-couner-server.onrender.com//api/company-workers-hours?company_id=${company_id}&year=${year}&month=${month}`
    
    );
    console.log(response);
    setWorkersHours(response.data);
    // setWorkerRoles(response.data);
  };
  console.log(currentMonth, currentYear);
  useEffect(() => {
    getWorkersHours(company.id, currentYear, currentMonth);
  }, []);

  return <div>WorkHours</div>;
}

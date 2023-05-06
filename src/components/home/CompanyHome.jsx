import React, { useContext, useState } from "react";
import { AuthContext, WorkerContext } from "../context";
import styles from "./home.module.scss";
import WorkerRoles from "./WorkerRoles";
import Workers from "./Workers";
import WorkHours from "./WorkHours";

const CompanyHome = () => {
  const { setIsAuth } = useContext(AuthContext);
  const {  setIsWorker } = useContext(WorkerContext);
  const [selectedSection, setSelectedSection] = useState(0);
  const sections = [<WorkerRoles />, <Workers />, <WorkHours />];
  return (
    <div className={styles.companyHomeContainer}>
      <div className={styles.homeNavbar}>
        <div onClick={() => setSelectedSection(0)}>Հաստիքների կառավարում</div>
        <div onClick={() => setSelectedSection(1)}>
          Աշխատակիցների կառավարում
        </div>
        <div onClick={() => setSelectedSection(2)}>Աշխատանքի ժամեր</div>
        <div
          onClick={() => {
            setIsAuth(false);
            setIsWorker(false);
            localStorage.clear();
          }}
        >
          Ելք
        </div>
      </div>
      <div className={styles.selectedSection}>{sections[selectedSection]}</div>
    </div>
  );
};

export default CompanyHome;

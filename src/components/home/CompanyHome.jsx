import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, WorkerContext } from "../context";
import styles from './home.module.scss'
import WorkerRoles from "./WorkerRoles";
import Workers from "./Workers";
import WorkHours from "./WorkHours";

const CompanyHome = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {isWorker, setIsWorker} = useContext(WorkerContext)
    async function logout() {
        const response = await axios.post(`http://localhost:5000/api/logout`  );
       localStorage.clear()
    }
    const [selectedSection, setSelectedSection] = useState(0)
    const sections = [<WorkerRoles/>, <Workers/>, <WorkHours/>]
    return(
        <div className={styles.companyHomeContainer}>
            <div className={styles.homeNavbar}>
                <div onClick={() => setSelectedSection(0)}>Հաստիքների կառավարում</div>
                <div onClick={() => setSelectedSection(1)}>Աշխատակիցների կառավարում</div>
                <div onClick={() => setSelectedSection(2)}>Աշխատանքի ժամեր</div>
                <div onClick={() => {
                    setIsAuth(false)
                    setIsWorker(false)
                    localStorage.clear();
                }}>Ելք</div>

            </div>
            <div className={styles.selectedSection}>{sections[selectedSection]}</div>
        </div>
    )
}

export default CompanyHome;
import React, { useEffect, useState } from "react";

import styles from "./home.module.scss";
import axios from "axios";
import MyModal from "../modal/MyModal";

export default function WorkerRoles() {
  const [workerRoles, setWorkerRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
  const [workerRoleName, setWorkerRoleName] = useState("");
  const [workerRoleSalary, setWorkerRoleSalary] = useState("");
  const company = JSON.parse(localStorage.getItem("company"));
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isCreateRoleModalVisible, setIsCreateRoleModalVisible] =
    useState(false);
    const [isEditRoleModalVisible, setIsEditRoleModalVisible] =
    useState(false);

  const deleteRole = async (id) => {
    await axios.delete(`https://work-couner-server.onrender.com/company-roles?role_id=${id}`);
  };
  const createRole = async (id) => {
    try {
      if (workerRoleName && workerRoleSalary) {
      }
      const response = await axios.post(
        "https://work-couner-server.onrender.com/company-roles",
        {
          company_id: company.id,
          role_name: workerRoleName,
          role_salary_for_hour: workerRoleSalary,
        }
      );
        setWorkerRoleName("")
        setWorkerRoleSalary("")
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const updateRole = async (id) => {
    try {
      if (workerRoleName && workerRoleSalary) {
      }
      const response = await axios.put(
        "https://work-couner-server.onrender.com/company-roles",
        {
          id: selectedRole.id,
          role_name: workerRoleName,
          role_salary_for_hour: workerRoleSalary,
        }
      );
        setWorkerRoleName("")
        setWorkerRoleSalary("")
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const getRoles = async () => {
    const response = await axios.get(
      `https://work-couner-server.onrender.com/company-roles?company_id=${company.id}`
    );
    setWorkerRoles(response.data);
  };
  useEffect(() => {
    getRoles();
  }, [isDeleteModalVisible, isCreateRoleModalVisible, isEditRoleModalVisible]);
  return (
    <div className={styles.workerRolesContainer}>
      <div className={styles.createRoleBtnContainer}>
        <button onClick={() => setIsCreateRoleModalVisible(true)}>
          Ավելացնել հաստիք
        </button>
      </div>

      <MyModal
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
      >
        <div className={styles.deleteModla}>
          Վստահ եք՞
          <div className={styles.btns}>
            <button
              className={styles.buttonNo}
              onClick={() => setIsDeleteModalVisible(false)}
            >
              Ոչ
            </button>
            <button
              className={styles.buttonYes}
              onClick={() => {
                deleteRole(selectedRole.id);
                setIsDeleteModalVisible(false);
              }}
            >
              Այո
            </button>
          </div>
        </div>
      </MyModal>
      <MyModal
        visible={isCreateRoleModalVisible}
        setVisible={setIsCreateRoleModalVisible}
      >
        <div className={styles.createRoleModla}>
          Ավելացնել նոր հաստիք
          <div className={styles.inputContainer}>
            <label>
              Հաստիքի անվանումը
              <input
                type="text"
                value={workerRoleName}
                onChange={(e) => setWorkerRoleName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              Աշխատավարձը 1ժամի համար
              <input
                type="number"
                value={workerRoleSalary}
                onChange={(e) => setWorkerRoleSalary(e.target.value)}
                required
              />
            </label>
          </div>
          <button
            className={styles.createBtn}
            disabled={ workerRoleName.length ===0 || workerRoleSalary.length ===0}
            onClick={() => {setIsCreateRoleModalVisible(false)
                createRole()
            }}
          >
            Ավելացնել
          </button>
        </div>
      </MyModal>
      <MyModal
        visible={isEditRoleModalVisible}
        setVisible={setIsEditRoleModalVisible}
      >
        <div className={styles.createRoleModla}>
          Թահմացնել հաստիքի տվյալները
          <div className={styles.inputContainer}>
            <label>
              Հաստիքի անվանումը
              <input
                type="text"
                value={workerRoleName}
                onChange={(e) => setWorkerRoleName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              Աշխատավարձը 1ժամի համար
              <input
                type="number"
                value={workerRoleSalary}
                onChange={(e) => setWorkerRoleSalary(e.target.value)}
                required
              />
            </label>
          </div>
          <button
            className={styles.createBtn}
            disabled={ workerRoleName.length ===0 || workerRoleSalary.length ===0}
            onClick={() => {setIsEditRoleModalVisible(false)
                updateRole()
            }}
          >
            Թարմացնել
          </button>
        </div>
      </MyModal>
      <div className={styles.workerRoleItem}>
        <div className={styles.workerRoleNameColumn}>Հաստիքի անվանումը</div>
        <div className={styles.workerRoleSalaryColumn}>
          Աշխատավարձը 1 ժամի համար
        </div>
      </div>
      {workerRoles.map((el) => (
        <div key={el.id} className={styles.workerRoleItem}>
          <div className={styles.workerRoleName}>{el.role_name}</div>
          <div className={styles.workerRoleSalary}>
            {el.role_salary_for_hour}
          </div>
          <button
            className={styles.editRole}
            onClick={() => {
              setSelectedRole(el);
              setIsEditRoleModalVisible(true);
            }}
          >
            Թարմացնել հաստիքը
          </button>
          <button
            className={styles.deleteRole}
            onClick={() => {
              setSelectedRole(el);
              setIsDeleteModalVisible(true);
            }}
          >
            Ջնջել հաստիքը
          </button>
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";

import styles from "./home.module.scss";
import axios from "axios";
import MyModal from "../modal/MyModal";

export default function Workers() {
  const [workers, setWorkers] = useState([]);
  const [workerRoles, setWorkerRoles] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState({});
  const [workerName, setWorkerName] = useState("");
  const [workerLastName, setWorkerLastName] = useState("");
  const [workerRoleId, setWorkerRoleId] = useState("");
  const company = JSON.parse(localStorage.getItem("company"));
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isCreateWorkerModalVisible, setIsCreateWorkerModalVisible] =
    useState(false);
  const [isEditRoleModalVisible, setIsEditRoleModalVisible] = useState(false);
  const[workerCode, setWorkerCode] = useState("")
  const[workerCodeModal, setWorkerCodeModal] = useState(false)

  const deleteWorker = async (id) => {
    await axios.delete(
      `http://localhost:8000/api/company-workers?worker_id=${id}`
    );
  };
  const createWorker = async (id) => {
    try {
      if (workerName && workerLastName && workerRoleId) {
      }
      const response = await axios.post(
        "http://localhost:8000/api/company-workers",
        {
          company_id: company.id,
          worker_name: workerName,
          worker_last_name: workerLastName,
          company_role_id: workerRoleId,
        }
      );
      setWorkerName("");
      setWorkerLastName("");
      setWorkerRoleId("");
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const updateWorker = async (id) => {
    try {
      if (workerName && workerLastName) {
      }
      const response = await axios.put(
        "http://localhost:8000/api/company-roles",
        {
          id: selectedWorker.id,
          worker_name: workerName,
          worker_last_name: workerLastName,
        }
      );
      setWorkerName("");
      setWorkerLastName("");
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const getWorkers = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/company-workers?company_id=${company.id}`
    );
    setWorkers(response.data);
    // setWorkerRoles(response.data);
  };
  const getRoles = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/company-roles?company_id=${company.id}`
    );
    setWorkerRoles(response.data);
  };
  const getWorkerCode = async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/company-worker/code?worker_id=${id}`
    );
    console.log(response.data)
    setWorkerCodeModal(true)
    setWorkerCode(response.data.worker_code);
  };

  useEffect(() => {
    getWorkers();
    getRoles();
  }, [isDeleteModalVisible,isCreateWorkerModalVisible ]);
  console.log(workerRoleId);
  return (
    <div className={styles.workerRolesContainer}>
      <div className={styles.createRoleBtnContainer}>
        <button onClick={() => setIsCreateWorkerModalVisible(true)}>
          Ավելացնել նոր աշխատակցի
        </button>
      </div>
      <MyModal
        visible={workerCodeModal}
        setVisible={setWorkerCodeModal}
      >{workerCode || 'Կոդը բացակայում է'}</MyModal>
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
                deleteWorker(selectedWorker.id);
                setIsDeleteModalVisible(false);
              }}
            >
              Այո
            </button>
          </div>
        </div>
      </MyModal>
      <MyModal
        visible={isCreateWorkerModalVisible}
        setVisible={setIsCreateWorkerModalVisible}
      >
        <div className={styles.createRoleModla}>
          Ավելացնել նոր աշխատակից
          <div className={styles.inputContainer}>
            <label>
              Անուն
              <input
                type="text"
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              Ազգանուն
              <input
                type="text"
                value={workerLastName}
                onChange={(e) => setWorkerLastName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              հաստիքը
              <select
                name="Ընտրեք հաստիքը"
                id="role"
                onChange={(e) => setWorkerRoleId(e.target.value)}
              >
                {workerRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            className={styles.createBtn}
            disabled={workerName.length === 0 || workerLastName.length === 0}
            onClick={() => {
              setIsCreateWorkerModalVisible(false);
              createWorker();
            }}
          >
            Ավելացնել
          </button>
        </div>
      </MyModal>
      {/* <MyModal
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
      </MyModal> */}
      <div className={styles.workerRoleItem}>
        <div className={styles.workerRoleNameColumn}>Աշխատող</div>
        <div className={styles.workerRoleSalaryColumn}>Հաստիք</div>
      </div>
      {workers.map((el) => (
        <div key={el.id} className={styles.workerRoleItem}>
          <div
            className={styles.workerRoleName}
            
          >{`${el.worker_name} ${el.worker_last_name}`}</div>
          <div className={styles.workerRoleSalary}>{el.role_name}</div>
          <button
            className={styles.editRole}
            onClick={() => getWorkerCode(el.id)}
          >
            Ստանալ աշխատակցի կոդը
          </button>
          <button
            className={styles.deleteRole}
            onClick={() => {
              setSelectedWorker(el);
              setIsDeleteModalVisible(true);
            }}
          >
            Հեռացնել աշխատակցին
          </button>
        </div>
      ))}
    </div>
  );
}

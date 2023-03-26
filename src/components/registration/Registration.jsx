import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, WorkerContext } from "../context";
import styles from "./registration.module.scss";

const Registration = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { isWorker, setIsWorker } = useContext(WorkerContext);
  const [checked, setChecked] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [workerCode, setWorkerCode] = useState("");
  const [workerLogin, setWorkerLogin] = useState("");
  const [workerPassword, setWorkerPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (companyName && adminUsername && login && password) {
      }
      const response = await axios.post(
        "https://work-couner-server.onrender.comcompany/regstration",
        {
          company_name: companyName,
          admin_username: adminUsername,
          login: login,
          password: password,
        }
      );
      if (response.status === 200) {
        setIsAuth(true);
        localStorage.setItem('company', JSON.stringify(response.data));
        localStorage.setItem('auth', 'true')
        navigate("/company-home");
      } else {
        console.log("first");
      }
      alert("kek");
    } catch (error) {
      alert(error.response.data);
    }
  };
  const workerSubmit = async (e) => {
    e.preventDefault();

    try {
      if (companyName && adminUsername && login && password) {
      }
      const response = await axios.put(
        "https://work-couner-server.onrender.comcompany-workers",
        {
          worker_code: workerCode,
          worker_login: workerLogin,
          worker_password: workerPassword,
        }
      );
      if (response.status === 200) {
        setIsAuth(true);
        setIsWorker(true);
        localStorage.setItem('worker', JSON.stringify(response.data));
        localStorage.setItem('auth', 'true')
        navigate("/worker-home");
      } else {
        console.log("first");
      }
      alert("kek");
    } catch (error) {
      alert(error.response.data);
    }
  };
  console.log(checked);
  return (
    <div className={styles.registrationContainer}>
      <div
        key={checked}
        className={`${styles.registrationCompanyModal} ${
          checked ? styles.rotate : ""
        }`}
      >
        <div className={styles.checkboxContainer}>
          <div>Ընտրեք գրանցվելու տարբերակը</div>
          <input
            className={`${styles.reactSwitchCheckbox}  ${
              checked ? styles.checked : ""
            }`}
            id={`react-switch-new`}
            type="checkbox"
            value={checked}
            onChange={() => setChecked(!checked)}
          />
          <label
            className={styles.reactSwitchLabel}
            htmlFor={`react-switch-new`}
          >
            <span
              className={`${styles.reactSwitchButton} ${
                checked ? styles.checked : ""
              }`}
            />
          </label>
        </div>
        {checked ? (
          <div className={styles.regBox}>
            <h1>Գրանցվել որպես աշխատող</h1>
            <form onSubmit={workerSubmit} className={styles.formContainer}>
              <div className={styles.inputContainer}>
                <label>
                  Վերիֆիկացոն կոդ
                  <input
                    type="text"
                    value={workerCode}
                    onChange={(e) => setWorkerCode(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className={styles.inputContainer}>
                <label>
                  Ծածկանուն
                  <input
                    type="text"
                    value={workerLogin}
                    onChange={(e) => setWorkerLogin(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className={styles.inputContainer}>
                <label>
                  Գաղտնաբառ
                  <input
                    type="password"
                    value={workerPassword}
                    onChange={(e) => setWorkerPassword(e.target.value)}
                    required
                  />
                </label>
              </div>

              <button
                className={styles.submitButton}
                type="submit"
                disabled={
                  workerCode.length === 0 ||
                  workerLogin.length === 0 ||
                  workerPassword.length === 0
                }
              >
                Գրանցել
              </button>
            </form>
            <div className={styles.loginContainer}>
              <div>Գրանցված եք՞</div>
              <button onClick={() => navigate("/login")}>Մուտք</button>
            </div>
          </div>
        ) : (
          <div className={styles.regBox}>
            <h1>Գրանցել ընկերություն</h1>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <div className={styles.inputContainer}>
                <label>
                  Ընկերության անվանումը
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className={styles.inputContainer}>
                <label>
                  Ձեր անվանումը
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className={styles.inputContainer}>
                <label>
                  Ծածկանուն
                  <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className={styles.inputContainer}>
                <label>
                  Գաղտնաբառ
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </div>

              <button
                className={styles.submitButton}
                type="submit"
                disabled={
                  companyName.length === 0 ||
                  adminUsername.length === 0 ||
                  login.length === 0 ||
                  password.length === 0
                }
              >
                Գրանցել
              </button>
            </form>
            <div className={styles.loginContainer}>
              <div>Գրանցված եք՞</div>
              <button onClick={() => navigate("/login")}>Մուտք</button>
            </div>
          </div>
        )}

        {/* <button
          onClick={() => {
            // navigate("/home");
            alert('hello')
          }}
        >
          test
        </button> */}
      </div>
    </div>
  );
};

export default Registration;

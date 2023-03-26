import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, WorkerContext } from "../context";
import styles from "./login.module.scss";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { isWorker, setIsWorker } = useContext(WorkerContext);
  const [checked, setChecked] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [workerLogin, setWorkerLogin] = useState("");
  const [workerPassword, setWorkerPassword] = useState("");
  const navigate = useNavigate();

  const workerSubmit = async (e) => {
    e.preventDefault();

    try {
      if (login && password) {
      }
      const response = await axios.post(
        "https://work-couner-server.onrender.com/company-worker/login",
        {
          worker_login: workerLogin,
          worker_password: workerPassword,
        }
      );

      if (response.status === 200) {
        setIsAuth(true)
        setIsWorker(true)
        localStorage.setItem("worker", JSON.stringify(response.data));
        localStorage.setItem("auth", true);
        localStorage.setItem("isWorker", true);
        navigate("/worker-home");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!login || !password) {
        return;
      }
      const response = await axios.post(
        "https://work-couner-server.onrender.com/company/login",
        {
          login: login,
          password: password,
        }
      );
      if (response.status === 200) {
        setIsAuth(true)
        setIsWorker(false)
        localStorage.setItem("company", JSON.stringify(response.data.company));
        localStorage.setItem("auth", "true");
        localStorage.setItem("isWorker", "false");
        navigate("/company-home");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
          <div>Մուտք գործելու տարբերակը</div>
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
            <h1>Մուտք որպես աշխատող</h1>
            <form onSubmit={workerSubmit} className={styles.formContainer}>
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
                  workerLogin.length === 0 || workerPassword.length === 0
                }
              >
                Մուտք
              </button>
            </form>
            <div className={styles.loginContainer}>
              <div>Գրանցված չեք՞</div>
              <button onClick={() => navigate("/registration")}>
                Գրանցվել
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.regBox}>
            <h1>Մուտք որպես ընկերություն</h1>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
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
                disabled={login.length === 0 || password.length === 0}
              >
                Մուտք
              </button>
            </form>
            <div className={styles.loginContainer}>
              <div>Գրանցված չեք՞</div>
              <button onClick={() => navigate("/registration")}>
                Գրանցվել
              </button>
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

export default Login;

import "./topbar.scss";
import { Person, Mail } from "@material-ui/icons";
import { useEffect, useState } from "react";
import Login from "../Login_Register/login/Login";
import Register from "../Login_Register/register/Register";

import Alert from "@mui/material/Alert";
import useAuth from "../../customHook/useAuth";
export default function Topbar({ menuOpen, setMenuOpen }) {
  const [registerModal, setRegisterModal] = useState(false);
  const [alertopen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const {login, setLogin} = useAuth()
  useEffect(()=> {
    console.log(login)
  },[login])

  const handleStop = () => {
    setTimeout(() => {
      setAlertOpen(false);
    }, 2000);
  };

  return (
    <>
      {(login) && (
        <Login
          loginModal={login}
          setLoginModal={setLogin}
          setAlertOpen={setAlertOpen}
          setAlertTitle={setAlertTitle}
          setAlertType={setAlertType}
        />
      )}
      {registerModal && (
        <Register
          registerModal={registerModal}
          setRegisterModal={setRegisterModal}
          setLoginModal={setLogin}
          setAlertOpen={setAlertOpen}
          setAlertTitle={setAlertTitle}
          setAlertType={setAlertType}
        />
      )}

      <div className={"topbar " + (menuOpen && "active")}>
        
        {alertopen && (
          <Alert severity={alertType.toString()}>
            {alertTitle.toString()}
            {handleStop()}
          </Alert>
        )}
        <div className="wrapper">
          <div className="left">
            <a href="#intro" className="logo">
              genius.
            </a>
            <div className="itemContainer">
              <Person className="icon" />
              <span>+44 924 12 74</span>
            </div>
            <div className="itemContainer">
              <Mail className="icon" />
              <span>safak@genius.com</span>
            </div>
          </div>
          <div className="right">
            <button className="signUpBtn" onClick={() => setLogin(true)}>
              ورود
            </button>
            <button
              className="registerBtn"
              onClick={() => setRegisterModal(true)}
            >
              ثبت نام
            </button>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="line1"></span>
              <span className="line2"></span>
              <span className="line3"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

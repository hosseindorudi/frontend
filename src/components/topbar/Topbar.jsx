import "./topbar.scss";
import { Person, Mail } from "@material-ui/icons";
import { useState } from "react";
import Login from "../Login_Register/login/Login";
import Register from "../Login_Register/register/Register";

export default function Topbar({ menuOpen, setMenuOpen }) {
  const [loginModal, setLoginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  return (
    <>
    {
      loginModal && <Login loginModal={loginModal} setLoginModal={setLoginModal}/>
    }
    {
      registerModal && <Register registerModal={registerModal} setRegisterModal={setRegisterModal} setLoginModal={setLoginModal}/>
    }
    <div className={"topbar " + (menuOpen && "active")}>
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
        <button className="signUpBtn" onClick={()=> setLoginModal(true)}>ورود</button>
          <button className="registerBtn" onClick={()=> setRegisterModal(true)}>ثبت نام</button>
          <div className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>
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

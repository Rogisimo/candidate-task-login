import React, { useEffect, useState } from "react";
import UserNameLogo from "../assets/icons/akar-icons_person.png";
import PasswordLogo from "../assets/icons/carbon_password.png";
import { usersData } from "../utils/data.js";

function Login() {
  const [user, setUser] = useState({});

  useEffect(() => {
    LogInLocalStorage();
  }, []);

  function LogInLocalStorage() {
    if (localStorage.getItem("userName") && localStorage.getItem("password")) {
      setUser({
        userName: localStorage.getItem("userName"),
        password: localStorage.getItem("password"),
      });
    }
  }

  async function loginUser() {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const userNameInput = document.getElementById("user-name").value;
    const passwordInput = document.getElementById("password").value;
    //Fake Fetch
    let users = await fetch("/fetchdata.com");
    users = usersData;
    if (
      userNameInput.match(mailformat) &&
      userNameInput !== "" &&
      passwordInput !== ""
    ) {
      if (
        userNameInput === users[1].userName &&
        passwordInput === users[1].password
      ) {
        setUser({
          userName: userNameInput,
          password: passwordInput,
        });
        localStorage.setItem("userName", userNameInput);
        localStorage.setItem("password", passwordInput);
      } else {
        alert("Incorrect Email or Password");
      }
    } else {
      alert("Invalid Email or Password");
    }
  }

  return (
    <div className="login-form">
      <form className="login-form">
        {user.userName ? (
          <div className="form-info">
            <h1>{user.userName.slice(0, user.userName.indexOf("@"))}</h1>
            <h3>Welcome To Our App!</h3>
          </div>
        ) : (
          <div className="form-info">
            <h1>Login</h1>
            <h3>Please enter your Login and your Password</h3>
          </div>
        )}
        <div className="form-group">
          <img src={UserNameLogo} alt="" />
          <input
            type="email"
            className="input-username"
            id="user-name"
            placeholder="Username or E-mail"
          />
        </div>
        <div className="form-group">
          <img src={PasswordLogo} alt="" />
          <input
            type="password"
            className="input-password"
            id="password"
            placeholder="Password"
          />
        </div>
      </form>
      <button className="login-btn" onClick={loginUser}>
        Login
      </button>
    </div>
  );
}

export default Login;

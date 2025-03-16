import { useState } from "react";
import { InputBox } from "../Common/Input";
import LoginImage from "../../Assets/Images/loginImage.png";
import "../../Assets/Css/Auth.scss";

export const UserAuth = () => {
  const [authMode, setAuthMode] = useState("login");

  const handleAuthChange = (mode: string) => setAuthMode(mode);

  const AuthForm = () => (
    <>
      <div>
        <label htmlFor="username">Username</label>
        <InputBox
          type="text"
          id="username"
          name="username"
          required
          placeholder="email/phone"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <InputBox
          type="password"
          id="password"
          name="password"
          required
          placeholder="password"
        />
      </div>
    </>
  );

  return (
    <div className="login-register-container">
      <img src={LoginImage} alt="Login" />

      {authMode === "login" && (
        <div className="login-container">
          <AuthForm />
          <button type="submit">Login</button>
        </div>
      )}

      {authMode === "register" && (
        <div className="register-container">
          <div>
            <label htmlFor="name">Name</label>
            <InputBox
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
            />
          </div>
          <AuthForm />

          <div>
            <label htmlFor="phonenumber">Phone Number</label>
            <InputBox
              type="tel"
              id="phoneNumber"
              name="phonenumber"
              placeholder="Phone number"
              required
            />
          </div>
          <button type="button">Register</button>
        </div>
      )}
      <div className="auth-toggle">
        {authMode === "register" ? (
          <button
            className={authMode === "register" ? "active" : ""}
            onClick={() => handleAuthChange("login")}
          >
            Already a member? Login
          </button>
        ) : (
          <button
            className={authMode === "login" ? "active" : ""}
            onClick={() => handleAuthChange("register")}
          >
            Create new Account, Register Now
          </button>
        )}
      </div>
    </div>
  );
};

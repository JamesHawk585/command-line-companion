import React, { useState } from "react";
import "./Authentication.css";

const Authentication = ({ user, setUser }) => {
  const [signUp, setSignUp] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  const handleSignUpClick = () => {
    return setSignUp((signUp) => !signUp);
  };

  const handleSubmit = () => {
    console.log("handleSubmit");
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const userDataCopy = { ...userData };
    userDataCopy[name] = value;
    setUserData(userDataCopy);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
        {signUp && (
          <>
            <label>Conform Passowrd</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </>
        )}
        <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
      </form>
      <div className="auth-errors-switch-wrapper">
        <h2 className="auth-errors">{""}</h2>
        <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
        <button
          id="register-or-signup-toggle-button"
          onClick={handleSignUpClick}
        >
          {signUp ? "Log In!" : "Register Now!"}
        </button>
      </div>
    </>
  );
};

export default Authentication;

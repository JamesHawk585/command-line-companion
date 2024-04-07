import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./Authentication.css";

const Authentication = ({ user, setUser, updateUser }) => {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
  });

  console.log(userData)

  // Currently not doing anything with password and confirm password fields. 

  const handleSignUpClick = () => {
    return setSignUp((signUp) => !signUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    console.log("handleSubmit");
    const config = {
      method:"POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(signUp ? userData : {"name": userData.name})
    }
    fetch( signUp ? "http://127.0.0.1:5555/signup": "http://127.0.0.1:5555/login", config)
    .then((r) => r.json())
    .then((user) => {
      updateUser(user);
      navigate('/')
    })
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const userDataCopy = { ...userData };
    userDataCopy[name] = value;
    setUserData(userDataCopy);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        {/* <label>Password</label>
        <input
          type="password"
          name="password"
          // May need an additional callback function to ensure that the passwords match
          // value={userData.password}
          onChange={handleChange}
        /> */}
        {signUp && (
          <>
            {/* <label>Confirm Passowrd</label>
            <input
              type="password"
              name="confirmPassword"
              // May need an additional callback function to ensure that the passwords match
              value={userData.password}
              onChange={handleChange}
            /> */}
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
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
            />
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
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

import React, { useEffect, useInsertionEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import "./Authentication.css";

 
const Authentication = ({ user, setUser, setSnippets, fetchSnippets }) => {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });



  const [errors, setErrors] = useState([]);


  // async function fetchSnippets(setSnippets) {
  //   fetch("/snippets")
  //     .then((r) => r.json())
  //     .then((data) => setSnippets(data));
  // };
 

  // console.log("user in Authentication/jsx", user);

  // Currently not doing anything with password and confirm password fields.

  const handleSignUpClick = () => {
    return setSignUp((signUp) => !signUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(
        signUp
          ? userData
          : { username: userData.username, password: userData.password }
      ),
    };
    fetch(signUp ? "/signup" : "/login", config).then((r) => {
      if (r.ok) {
        setUser(r)
        navigate("/");
        fetchSnippets()
      } else {
        r.json().then((data) => {
          console.log("console.log(data)", data)
          setTimeout(() => {
            setErrors([]);
          }, 5000);
          setErrors(data.errors);
        });
      }
    });
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
        <label>Password</label>
        <input
          type="password"
          name="password"
          // May need an additional callback function to ensure that the passwords match
          value={userData.password}
          onChange={handleChange}
        />
        {signUp && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              // May need an additional callback function to ensure that the passwords match
              value={userData.password_confirmation}
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
        <h2 className="auth-errors">
          {errors.map((error) => (
            <p key={error /*Use UUID*/}>{error}</p>
          ))}
        </h2>
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

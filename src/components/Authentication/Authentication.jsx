import React, { useState } from "react";
import './Authentication.css'

const Authentication = () => {
  const [signUp, setSignUp] = useState(false);

  const handleSignUpClick = () => {
    return setSignUp((signUp) => !signUp);
  };

  const handleSubmit = () => {
    console.log("handleSubmit");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="name"
          value={""}
          onChange={console.log}
        />
        {signUp && (
          <>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={"value"}
              onChange={console.log}
            />
          </>
        )}
        <input type="submit" value={signUp ? "Sign Up!" : "Log In!"}/>
      </form>
      <div className="auth-errors-switch-wrapper">
        <h2 className="auth-errors">{""}</h2>
        <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
        <button onClick={handleSignUpClick}>
            {signUp ? "Log In!" : "Register Now!"}
        </button>
      </div>
    </>
  );
};

export default Authentication;

import React from 'react'
import { Await, useNavigate } from "react-router-dom";
import OffCanvasNavBar from "./../OffCanvasNavBar/OffCanvasNavBar.jsx";
import "./UserProfile.css"


const UserProfile = ({ user, lightMode, getClassNameSuffix }) => {

  const {username, first_name, last_name, email} = user
  
  return (
    <div className={`user-info${getClassNameSuffix(lightMode)}`}>
      <ul>
        <li><strong>Username:</strong> {username}</li>
        <li><strong>First Name:</strong> {first_name}</li>
        <li><strong>Last Name: </strong>{last_name}</li>
        <li><strong>Email: </strong>{email}</li>
        <li><strong>Snippet Count: </strong></li>
      </ul>
    </div>
  )
}

export default UserProfile
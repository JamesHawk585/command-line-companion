import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./BootstrapUserProfile.css";
import MugShot from "../../images/mugshot.png";
import EditUserProfile from '../EditUserProfile/EditUserProfile';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

function BootstrapUserProfile({ user, lightMode, getClassNameSuffix, snippets }) {
  const [editProfile, setEditProfile] = useState(false)
  const navigate = useNavigate()

console.log(editProfile)

    const {username, first_name, last_name, email} = user



    const editUserProfile = () => {
      navigate("/EditUserProfile")
    }

    const deleteUser = () => {
      console.log("Delete user!")
    }

    const changePassword = () => {
      console.log("Chnaging password!")
    }

  return (
    <>
    <Card className={`user-profile-card${getClassNameSuffix(lightMode)}`}>
      <Card.Img variant="top" src={MugShot} className='user-profile-picture'/>
      <Card.Body>
        <Card.Title><h1 className='profile-card-username'>{username}</h1></Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><h2>{first_name}</h2></ListGroup.Item>
        <ListGroup.Item><h2>{last_name}</h2></ListGroup.Item>
        <ListGroup.Item><h2>{email}</h2></ListGroup.Item>
        <ListGroup.Item><h2>Snippet Count: {snippets.length}</h2></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <button onClick={ () => editUserProfile()} className={`edit-profile-button${getClassNameSuffix(lightMode)}`}>Edit Profile</button>
        <button onClick={() => deleteUser()} className={`delete-account-button${getClassNameSuffix(lightMode)}`}>Delete Profile</button>
      </Card.Body>
    </Card>
    </>
  );
}

export default BootstrapUserProfile;

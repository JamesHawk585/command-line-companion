import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./BootstrapUserProfile.css";
import MugShot from "../../images/mugshot.png";
import EditUserProfile from '../EditUserProfile/EditUserProfile';
import React, { useState, useEffect, createContext } from "react";

function BootstrapUserProfile({ user, lightMode, getClassNameSuffix }) {
  const [editProfile, setEditProfile] = useState(false)

console.log(editProfile)

    const {username, first_name, last_name, email} = user

    const editUserProfile = () => {
      setEditProfile(true)
      console.log("edit user profile details!")
    }

    const deleteUser = () => {
      console.log("Delete user!")
    }


  return (
    <>
    {editProfile ? (
      <EditUserProfile/>
    ) : (
    <Card className={`user-profile-card${getClassNameSuffix(lightMode)}`}>
      <Card.Img variant="top" src={MugShot} className='user-profile-picture'/>
      <Card.Body>
        <Card.Title><h1>{username}</h1></Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><h2>{first_name}</h2></ListGroup.Item>
        <ListGroup.Item><h2>{last_name}</h2></ListGroup.Item>
        <ListGroup.Item><h2>{email}</h2></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <button onClick={ () => editUserProfile()} className={`edit-profile-button${getClassNameSuffix(lightMode)}`}>Edit Profile</button>
        <button onClick={() => deleteUser()} className={`delete-account-button${getClassNameSuffix(lightMode)}`}>Delete Account</button>
      </Card.Body>
    </Card>
    )}
    </>
  );
}

export default BootstrapUserProfile;

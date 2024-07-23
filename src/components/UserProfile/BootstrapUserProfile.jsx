import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./BootstrapUserProfile.css";
import MugShot from "../../images/mugshot.png";
import EditUserProfile from '../EditUserProfile/EditUserProfile';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect, createContext } from "react";

function BootstrapUserProfile({ user, lightMode, getClassNameSuffix }) {
  const [editProfile, setEditProfile] = useState(false)

console.log(editProfile)

    const {username, first_name, last_name, email} = user

    const toggleEditUserForm = () => {
      editProfile ? setEditProfile(true) : setEditProfile(false)
    }

    const editUserProfile = () => {
      setEditProfile(true)
      console.log("edit user profile details!")
    }

    const deleteUser = () => {
      console.log("Delete user!")
    }

    const changePassword = () => {
      console.log("Chnaging password!")
    }

  return (
    <>
    {editProfile ? (



      // consider using client side routing here instead of a stateful boolean to toggle between components. 




      <EditUserProfile lightMode={lightMode} getClassNameSuffix={getClassNameSuffix} editProfile={editProfile} setEditProfile={setEditProfile} toggleEditUserForm={toggleEditUserForm}/>
    ) : (
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
        <ListGroup.Item><h2><em>Snippet count goes here</em></h2></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <button onClick={ () => editUserProfile()} className={`edit-profile-button${getClassNameSuffix(lightMode)}`}>Edit Profile</button>
        <button onClick={() => deleteUser()} className={`delete-account-button${getClassNameSuffix(lightMode)}`}>Delete Profile</button>
      </Card.Body>
    </Card>
    )}
    </>
  );
}

export default BootstrapUserProfile;

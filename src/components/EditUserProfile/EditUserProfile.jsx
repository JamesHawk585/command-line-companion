import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./EditUserProfile.css";

const EditUserProfile = ({
  editProfile,
  setEditProfile,
  toggleEditUserForm,
  getClassNameSuffix,
  lightMode,
  user
}) => {
  const [validated, setValidated] = useState(false);
  const [confirmButtonClicked, setConfrimButtonClicked] = useState(false);
  const navigate = useNavigate();

  const [editedUserProfileObject, setEditedUserProfileObject] = useState({
    first_name: "",
    last_name: "", 
    username: "",
    email: "",
  })


  // console.table(editedUserProfileObject)


  const handleChange = (e) => {
    const editedUserProfileObjectCopy = { ...editedUserProfileObject };
    setEditedUserProfileObject({
      ...editedUserProfileObjectCopy,
      [e.target.name]: e.target.value,
    });
    console.log(editedUserProfileObject)
  };

  const handleEditedUserObjectSubmit = (e) => {
    console.log("handleEditedUserObjectSubmit() hit!")
    e.preventDefault();
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editedUserProfileObject),
    })
    .then((r) => r.json())
    .then((responseUserObject) => onUserEdited(responseUserObject, e));

    navigate("/userProfile")
  };

  const onUserEdited = (responseUserObject, e) => {
    console.log("responseUserObject", responseUserObject)
  }


  console.log("%cWe are using client side routing to navigate to the EditUSerProfile route when the user clicks 'Edit Profile'. EditUserProfile will be a parent component to three two modal components. Delete account button will remain on the UserProfile component.", "color: orange");

  const navigateToChangePassword = () => {
    navigate("/ChangePassword");
  };

  function backToBootstrapUserProfile() {
    navigate("/UserProfile")
  }

  const getButtonVariantByLightMode = (lightMode) =>
    lightMode ? "dark" : "light";

  return (
    <Form noValidate validated={validated} onSubmit={(e) => handleEditedUserObjectSubmit(e)}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>
            <h2
              className={`edit-user-profile-form-h2-labels${getClassNameSuffix(
                lightMode
              )}`}
            >
              First name
            </h2>
          </Form.Label>
          <Form.Control name="first_name" required type="text" placeholder="First name" value={editedUserProfileObject.first_name} onChange={(e) => handleChange(e)}/>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label
            className={`edit-user-profile-form-h2-labels${getClassNameSuffix(
              lightMode
            )}`}
          >
            <h2>Last name</h2>
          </Form.Label>
          <Form.Control name="last_name" required type="text" placeholder="Last name" value={editedUserProfileObject.last_name} onChange={(e) => handleChange(e)}/>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label
            className={`edit-user-profile-form-h2-labels${getClassNameSuffix(
              lightMode
            )}`}
          >
            <h2>Username</h2>
          </Form.Label>
          <InputGroup hasValidation>
            <Form.Control
            name="username"
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              value={editedUserProfileObject.username}
              onChange={(e) => handleChange(e)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label
            className={`edit-user-profile-form-h2-labels${getClassNameSuffix(
              lightMode
            )}`}
          >
            <h2>Email</h2>
          </Form.Label>
          <Form.Control name="email" type="text" placeholder="email" required value={editedUserProfileObject.email} onChange={(e) => handleChange(e)}/>
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="6"
          controlId="formFile"
          className="mb-3"
          style={{ width: "50%" }}
        >
          <Form.Label
            className={`edit-user-profile-form-h2-labels${getClassNameSuffix(
              lightMode
            )}`}
          >
            <h2>Profile Photo</h2>
          </Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Row>
      <Button
        variant={getButtonVariantByLightMode(lightMode)}
        size="lg"
        className="edit-user-profile-submit-button"
        type="submit"
      >
        Submit
      </Button>
      <Button
        variant={getButtonVariantByLightMode(lightMode)}
        size="lg"
        className="change-password-button"
        onClick={() => navigateToChangePassword()}
      >
        Change Password
      </Button>
      <Button
        variant={getButtonVariantByLightMode(lightMode)}
        size="lg"
        className="back-to-profile-button"
        onClick={() => backToBootstrapUserProfile()}
      >
        Back to Profile
      </Button>
    </Form>
  );
};

export default EditUserProfile;

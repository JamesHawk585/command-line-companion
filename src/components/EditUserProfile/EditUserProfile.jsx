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

  console.log(editedUserProfileObject)

  const handleChange = () => {
    
  }

  const handleSubmit = () => {
    console.log("Form submitted!")
  };


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
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
          <Form.Control required type="text" placeholder="First name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label
            className={`edit-user-profile-form-h2-labels${getClassNameSuffix(
              lightMode
            )}`}
          >
            <h2>Last name</h2>
          </Form.Label>
          <Form.Control required type="text" placeholder="Last name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
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
          <Form.Control type="text" placeholder="email" required />
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
        onClick={() => console.log("submit edit user form")}
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

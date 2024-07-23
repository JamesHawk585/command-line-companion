import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './EditUserProfile.css'

const EditUserProfile = ({editProfile, setEditProfile, toggleEditUserForm, getClassNameSuffix, lightMode}) => {
    const [validated, setValidated] = useState(false);
    const [confirmButtonClicked, setConfrimButtonClicked] = useState(false)


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);
      };


      function backToBootstrapUserProfile() {
        setEditProfile(false)
      } 

      const getButtonVariantByLightMode = (lightMode) => lightMode ? "dark" : "light"
      


  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label><h2 className={`edit-user-profile-form-h2-labels${getClassNameSuffix(lightMode)}`}>First name</h2></Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className={`edit-user-profile-form-h2-labels${getClassNameSuffix(lightMode)}`}><h2>Last name</h2></Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label className={`edit-user-profile-form-h2-labels${getClassNameSuffix(lightMode)}`}><h2>Username</h2></Form.Label>
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
          <Form.Label className={`edit-user-profile-form-h2-labels${getClassNameSuffix(lightMode)}`}><h2>Email</h2></Form.Label>
          <Form.Control type="text" placeholder="email" required />
          <Form.Control.Feedback type="invalid">
          </Form.Control.Feedback> 
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formFile" className="mb-3" style={{width: '50%'}}>
        <Form.Label className={`edit-user-profile-form-h2-labels${getClassNameSuffix(lightMode)}`}><h2>Profile Photo</h2></Form.Label>
        <Form.Control type="file" />
        </Form.Group>
      </Row>
      <Button variant={getButtonVariantByLightMode(lightMode)} size="lg" className='edit-user-profile-submit-button'>Submit</Button>
      <Button variant={getButtonVariantByLightMode(lightMode)} size="lg" className='change-password-button'>Change Password</Button>
      <Button variant={getButtonVariantByLightMode(lightMode)} size="lg" className='back-to-profile-button' onClick={() => backToBootstrapUserProfile()}>Back to Profile</Button>
    </Form>
  )
}

export default EditUserProfile
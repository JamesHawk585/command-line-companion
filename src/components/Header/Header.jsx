import React, { useRef, useState } from "react";
import AddSnippetForm from "../AddSnippetForm/AddSnippetForm.jsx"
import BootstrapAddSnippetForm from "../BootstrapAddSnippetForm/BootstrapAddSnippetForm.jsx"
import '../../App.css';
import './Header.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';




const Header = ({ onSnippetAdded, searchTerm, setSearchTerm, currentUserId }) => {

  const dialogRef = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const onAddButtonClick = () => {
        handleShow()
    }

    const onSnippetFormSubmitted = (newSnippetObject) => {
        dialogRef.current.close()
        onSnippetAdded(newSnippetObject)
    }



    const userId = currentUserId

//  Controlled componenet = changing state causes the componenet to re-render. Comes with value={} and onChange={} jsx attributes. 
  return (
    <>
      <header className="header">
        <div id="search-bar-div">
          <label>
            🔎 <input type="search" id="search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            {/* <button className="add-snippet-button" onClick={() => onAddButtonClick()}>+Add</button> */}
            <Button variant="primary" onClick={onAddButtonClick}>
        Add Snippet
      </Button>
          </label>
        </div>
        <AddSnippetForm dialogRef={dialogRef} onSnippetFormSubmitted={onSnippetFormSubmitted} userId={userId}/>
        <BootstrapAddSnippetForm dialogRef={dialogRef} onSnippetFormSubmitted={onSnippetFormSubmitted} userId={userId}/>
      </header>
      {show && (
              <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
      )}
      </>
  );
};

export default Header;

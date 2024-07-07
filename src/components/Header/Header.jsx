import React, { useEffect, useRef, useState, prevState } from "react";
import AddSnippetForm from "../AddSnippetForm/AddSnippetForm.jsx";
import BootstrapAddSnippetForm from "../BootstrapAddSnippetForm/BootstrapAddSnippetForm.jsx";
import "../../App.css";
import "./Header.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import Dropdown from "react-bootstrap/Dropdown";
import SnippetList from "../SnippetList/SnippetList.jsx";

const Header = ({
  onSnippetAdded,
  searchTerm,
  setSearchTerm,
  currentUserId,
  snippets,
  setSnippets,
  lightMode,
  getClassNameSuffix
}) => {
  const dialogRef = useRef(null);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const [newSnippetObject, setNewSnippetObject] = useState({
    title: "",
    language_select: "",
    code: "",
    explanation: "",
  });


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const onAddButtonClick = () => {
    handleShow();
  };



  const handleSubmit = (e) => {
    handleClose()
    e.preventDefault();
    console.log(e);
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newSnippetObject),
    };

    fetch("/snippets", config)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log("data returned from the network call", data);
        onSnippetAdded(data);
        setNewSnippetObject({
          title: "",
          language_select: "",
          code: "",
          explanation: ""
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    console.log(e);
    const newSnippetCopy = { ...newSnippetObject };
    setNewSnippetObject({
      ...newSnippetCopy,
      [e.target.name]: e.target.value,
    });
    console.log(newSnippetCopy);
    // console.log(newSnippetObject)
  };

  const userId = currentUserId;

  return (
    <>
      <header className="header">
        <div id="search-bar-div">
          <label>
            🔎{" "}
            <input
              type="search"
              id="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <Button
              variant="primary"
              id="add-snippet-button"
              onClick={onAddButtonClick}
            >
              Add Snippet
            </Button>
          </label>
        </div>
        <AddSnippetForm dialogRef={dialogRef} userId={userId} />
        <BootstrapAddSnippetForm dialogRef={dialogRef} userId={userId} />
      </header>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <CloseButton aria-label="Hide" variant="white" />
            <Modal.Title>New Snippet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  placeholder="Log 'Hello world' to the console."
                  value={newSnippetObject.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Choose a Language</Form.Label>
                <Form.Control
                  as="select"
                  name="language_select"
                  value={newSnippetObject.language_select}
                  onChange={handleChange}
                >
                  <option value="">{newSnippetObject.language_select === "" ? "Please choose a language" : newSnippetObject.language_select}</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="CSS">CSS</option>
                  <option value="HTML">HTML</option>
                  <option value="CLI">CLI</option>

                </Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Code</Form.Label>
                <Form.Control
                  name="code"
                  as="textarea"
                  rows={3}
                  value={newSnippetObject.code}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Explanation</Form.Label>
                <Form.Control
                  name="explanation"
                  as="textarea"
                  rows={3}
                  value={newSnippetObject.explanation}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Header;

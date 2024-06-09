import React, { useRef, useState } from "react";
import AddSnippetForm from "../AddSnippetForm/AddSnippetForm.jsx";
import BootstrapAddSnippetForm from "../BootstrapAddSnippetForm/BootstrapAddSnippetForm.jsx";
import "../../App.css";
import "./Header.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import Dropdown from "react-bootstrap/Dropdown";

const Header = ({
  onSnippetAdded,
  searchTerm,
  setSearchTerm,
  currentUserId,
}) => {
  const dialogRef = useRef(null);
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [newSnippetObject, setNewSnippetObject] = useState({
    title: "",
    languageSelect: "",
    code: "",
    explanation: "",
  });

  // const newSnippetObject = Object.fromEntries(new FormData(e.target));
  console.log(newSnippetObject);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = () => {
    return "Hit handle submit!";
  };

  const onAddButtonClick = () => {
    handleShow();
  };

  const onSnippetFormSubmitted = (newSnippetObject) => {
    dialogRef.current.close();
    console.log(newSnippetObject);
    onSnippetAdded(newSnippetObject);
    setSelectedLanguage("");
  };

  const userId = currentUserId;

  //  Controlled componenet = changing state causes the componenet to re-render. Comes with value={} and onChange={} jsx attributes.
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
        <AddSnippetForm
          dialogRef={dialogRef}
          onSnippetFormSubmitted={onSnippetFormSubmitted}
          userId={userId}
        />
        <BootstrapAddSnippetForm
          dialogRef={dialogRef}
          // onSnippetFormSubmitted={() => onSnippetFormSubmitted(newSnippetObject)}
          userId={userId}
        />
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
                  type="title"
                  placeholder="Log 'Hello world' to the console."
                  value={newSnippetObject.title}
                  onChange={(e) =>
                    setNewSnippetObject({
                      ...newSnippetObject,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Choose a Language</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-basic"
                    placeholder="Select a Language"
                  >
                    {selectedLanguage === ""
                      ? "Please choose a Language"
                      : selectedLanguage}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#/javascript"
                      onClick={() => {
                        setSelectedLanguage("JavaScript");
                        setNewSnippetObject({
                          ...newSnippetObject,
                          languageSelect: "JavaScript",
                        });
                      }}
                    >
                      JavaScript
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/python"
                      onClick={() => {
                        setSelectedLanguage("Python");
                        setNewSnippetObject({
                          ...newSnippetObject,
                          languageSelect: "Python",
                        });
                      }}
                    >
                      Python
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/html"
                      onClick={() => {
                        setSelectedLanguage("HTML");
                        setNewSnippetObject({
                          ...newSnippetObject,
                          languageSelect: "HTML",
                        });
                      }}
                    >
                      HTML
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/css"
                      onClick={() => {
                        setSelectedLanguage("CSS");
                        setNewSnippetObject({
                          ...newSnippetObject,
                          languageSelect: "CSS",
                        });
                      }}
                    >
                      CSS
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/cli"
                      onClick={() => {
                        setSelectedLanguage("CLI");
                        setNewSnippetObject({
                          ...newSnippetObject,
                          languageSelect: "CLI",
                        });
                      }}
                    >
                      CLI
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Code</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={3} 
                value={newSnippetObject.code}
                onChange={(e) => setNewSnippetObject({...newSnippetObject, code: e.target.value})}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Explanation</Form.Label>
                <Form.Control as="textarea" rows={3} 
                value={newSnippetObject.explanation}
                onChange={(e) => setNewSnippetObject({...newSnippetObject, explanation: e.target.value})}
                />
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

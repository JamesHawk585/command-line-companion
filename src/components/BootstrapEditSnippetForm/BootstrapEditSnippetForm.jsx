import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import 'bootstrap/dist/css/bootstrap.min.css';


function BootstrapEditSnippetForm({
  editRef,
  onSnippetFormEdited,
  snippetId,
  title,
  languageSelect,
  code,
  explanation,
  show,
  setShow,
  getClassNameSuffix,
  lightMode
}) {
  // const formRef = useRef(null);
  const [editedSnippetObject, setEditedSnippetObject] = useState({
    title: title,
    language_select: languageSelect,
    code: code,
    explanation: explanation,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, onSnippetFormEdited) => {
    const editedSnippetCopy = { ...editedSnippetObject };
    setEditedSnippetObject({
      ...editedSnippetCopy,
      [e.target.name]: e.target.value,
    });
  };

  console.log(editedSnippetObject);

  const handleEditedSnippetObjectSubmit = (e) => {
    e.preventDefault();

    handleClose()

    fetch(`/snippets/${snippetId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editedSnippetObject),
    })
      .then((r) => r.json())
      .then((responseSnippetObject) => onSnippetFormEdited(responseSnippetObject, e)
    
  )};

  // const closeEditModal = (e) => {
  //   e.preventDefault();
  //   editRef.current.close();
  // };

  return (
    <>
      {show && (
        <Modal show={show} onHide={handleClose} className={`edit-snippet-modal${getClassNameSuffix(lightMode)}`} size="xl">
          
          <Modal.Header>
            <CloseButton aria-label="Hide" variant="white" />
            <Modal.Title>Edit "<em>{title}</em>"?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => handleEditedSnippetObjectSubmit(e)}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label><h4>Title</h4></Form.Label>
                <Form.Control
                  name="title"
                  placeholder="Log 'Hello world' to the console."
                  value={editedSnippetObject.title}
                  onChange={(e) => handleChange(e)}
                  size="xl"
                  style={{ width: '69em' }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label><h4>Choose a Language</h4></Form.Label>
                <Form.Control
                  as="select"
                  name="language_select"
                  value={editedSnippetObject.language_select}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  style={{ width: '69em' }}
                >
                  <option defaultValue="" className="form-control"
                    style={{ width: '69em' }}>
                    {languageSelect === ""
                      ? "Please choose a language"
                      : languageSelect}
                  </option>
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
                <Form.Label><h4>Code</h4></Form.Label>
                <Form.Control
                  name="code"
                  as="textarea"
                  rows={3}
                  value={editedSnippetObject.code}
                  onChange={(e) => handleChange(e)}
                  className="form-control cutom-form-input"
                  style={{ width: '69em' }}
                  />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label><h4>Explanation</h4></Form.Label>
                <Form.Control
                  name="explanation"
                  as="textarea"
                  rows={3}
                  value={editedSnippetObject.explanation}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  style={{ width: '69em' }}
                />
              
                <Button variant="dark" onClick={handleClose} className={`close-edit-snippet-modal-button${getClassNameSuffix(lightMode)}`}>
                  Close
                </Button >
                <Button variant="dark" type="submit" className={`save-changes-edit-snippet-modal-button${getClassNameSuffix(lightMode)}`} >
                  Save Changes
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          {/* </Modal.Footer> */}
        </Modal>
      )}
    </>
  );
}

export default BootstrapEditSnippetForm;

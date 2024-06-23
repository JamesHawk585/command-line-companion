import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

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
}) {
  const formRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = () => {
    onSubmitEditForm()
  }

  const onSubmitEditForm = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);
    fetch(`/snippets/${snippetId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      // .then(responseSnippetObject => console.log(responseSnippetObject))
      .then((responseSnippetObject) =>
        onSnippetFormEdited(responseSnippetObject, e)
      );
    formRef.current.reset();
  };

  const closeEditModal = (e) => {
    e.preventDefault();
    editRef.current.close();
  };


    return (
        <>
        {show && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <CloseButton aria-label="Hide" variant="white" />
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={onSubmitEditForm}>
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
  }


export default BootstrapEditSnippetForm;

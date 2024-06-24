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
  const [editedSnippetObject, setEditedSnippetObject] = useState({
    title: "",
    language_select: "",
    code: "",
    explanation: "",
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
const handleChange = (e) => {
  const editedSnippetCopy = { ...editedSnippetObject }
  setEditedSnippetObject({
    ...editedSnippetCopy,
    [e.target.name]: e.target.value,
  });
  console.log(editedSnippetCopy)


}


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    console.log(e.target)
    console.log(e.target.value)
    const formData = Object.fromEntries(new FormData(e.target));
    
    // Getting an empty string from e.target.value  
    
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

  // const closeEditModal = (e) => {
  //   e.preventDefault();
  //   editRef.current.close();
  // };


    return (
        <>
        {show && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <CloseButton aria-label="Hide" variant="white" />
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    placeholder="Log 'Hello world' to the console."
                    value={editedSnippetObject.title}
                    onChange={(e) => handleChange(e)}

                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Choose a Language</Form.Label>
                  <Form.Control
                    as="select"
                    name="languageSelect"
                    value={editedSnippetObject.language_select}
                    onChange={(e) => handleChange(e)}
                  >
                    <option defaultValue="">{languageSelect === "" ? "Please choose a language" : languageSelect}</option>
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
                    value={editedSnippetObject.code}
                    onChange={(e) => handleChange(e)}
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
                    value={editedSnippetObject.explanation}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose} type="close">
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  }


export default BootstrapEditSnippetForm;

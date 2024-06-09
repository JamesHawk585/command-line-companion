import React, { useRef, useEffect } from "react";
import "./AddSnippetForm.css";



const AddSnippetForm = ({ dialogRef, onSnippetFormSubmitted, userId }) => {
  const formRef = useRef(null)
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    const requestBody = {
      ...formData,
      user_id: userId
    }
 

    fetch(
      "/snippets",
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(requestBody)
      })
        .then(r => r.json())
        .then(responseSnippetObject => onSnippetFormSubmitted(responseSnippetObject))
        formRef.current.reset()
};

const closeModal = (e) => {
  e.preventDefault();
  formRef.current.reset();
  dialogRef.current.close();
} 

  return (
    <dialog ref={dialogRef} className="add-snippet-modal">
      <form className="form" onSubmit={(e) => onSubmit(e)} ref={formRef}>
        <label className="title-label">
          Title
          <input name="title" />
        </label>
        <label>
          Language
          <select name="language_select">
            <option>JavaScript</option>
            <option>Python</option>
            <option>HTML</option>
            <option>CSS</option>
            <option>Terminal Commands</option>
          </select>
        </label>
        <label>
          Code
          <textarea name="code"></textarea>
        </label>
        <label>
          Explanation
          <textarea name="explanation"></textarea>
        </label>
        <button>Save</button>
        <button onClick={(e) => closeModal(e)}>Close</button>
      </form>
    </dialog>
  );
};

export default AddSnippetForm;

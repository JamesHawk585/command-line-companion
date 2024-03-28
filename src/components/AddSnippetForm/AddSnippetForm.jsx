import React, { useRef, useEffect } from "react";
import "./SnippetForm.css";


const API = "http://127.0.0.1:5555/snippets";

const SnippetForm = ({ dialogRef, onSnippetFormSubmitted }) => {
  const formRef = useRef(null)
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData)
    fetch(
      API,
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(formData)
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

//   The response body of a post request is the newly added object as it appears in the db, with id. 

  return (
    <dialog ref={dialogRef}>
      <form className="form" onSubmit={(e) => onSubmit(e)} ref={formRef}>
        <label className="title-label">
          Title
          <input name="title" />
        </label>
        <label className="tag-label">
          Tags
          <input className="tags" name="tags" />
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

export default SnippetForm;

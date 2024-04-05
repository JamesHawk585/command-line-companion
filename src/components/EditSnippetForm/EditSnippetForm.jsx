import React, { useRef } from 'react'

function EditSnippetForm({ editRef, onSnippetFormEdited, snippetId, title, languageSelect, code, explanation }) {
    const formRef = useRef(null)

    const API = 'http://127.0.0.1:5555/snippets'

const onSubmitEditForm = (e) => {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(e.target));
  console.log(formData)
  fetch(`${API}/${snippetId}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then(r => r.json())
    // .then(responseSnippetObject => console.log(responseSnippetObject))
    .then(responseSnippetObject => onSnippetFormEdited(responseSnippetObject, e))
    formRef.current.reset()

};

const closeEditModal = (e) => {
  e.preventDefault()
  editRef.current.close()
}

  return (
    <dialog ref={editRef}>
      <form className="form" onSubmit={(e) => onSubmitEditForm(e)} ref={formRef}>
        <label className="title-label">
          Title
          <input name="title" defaultValue={title}/>
        </label>
        {/* <label className="tag-label">
          Tags
          <input className="tags" name="tags" />
        </label> */}
        <label>
          Language
          <select name="language_select" defaultValue={languageSelect}>
            <option>JavaScript</option>
            <option>Python</option>
            <option>HTML</option>
            <option>CSS</option>
            <option>Terminal Commands</option>
          </select>
        </label>
        <label>
          Code
          <textarea name="code" defaultValue={code}></textarea>
        </label>
        <label>
          Explanation
          <textarea name="explanation" defaultValue={explanation}></textarea>
        </label>
        <button>Save</button>
        <button onClick={(e) => closeEditModal(e)}>Close</button>
      </form>
    </dialog>
  )
}

export default EditSnippetForm
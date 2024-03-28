import React, { useRef } from 'react'
import './SnippetCard.css'
import EditSnippetForm from '../EditSnippetForm/EditSnippetForm';

const SnippetCard = ({  
    title,
    tags,
    languageSelect,
    code,
    onSnippetDeleted,
    snippetId, 
    explanation,
    passPatchResponseObjectFromChildToParent
}) => {


  const editRef = useRef(null)

  const handleEditSnippet = (e) => {
    e.preventDefault();
    editRef.current.showModal();
  }

  const handleDeleteSnippet = (e, title) => {
    e.preventDefault();
    onSnippetDeleted(snippetId, title);
  }

  const onSnippetFormEdited = (responseSnippetObject, e) => {
    e.preventDefault()
    editRef.current.close()
    passPatchResponseObjectFromChildToParent(responseSnippetObject);
  }


  return (
  <>
    <div className='snippetCard'>
        <h1>{title}</h1>
        <h3>{tags}</h3>
        <h3>{languageSelect}</h3>
        <h3>{code}</h3>
        <h3>{explanation}</h3>
        <button onClick={(e) => handleEditSnippet(e)}>Edit</button>
        <button onClick={(e) => handleDeleteSnippet(e, title)}>Delete</button>
    </div>
    <EditSnippetForm editRef={editRef} onSnippetFormEdited={onSnippetFormEdited} snippetId={snippetId}/>
    </>
  )
}

export default SnippetCard
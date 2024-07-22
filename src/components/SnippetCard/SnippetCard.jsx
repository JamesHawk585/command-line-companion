import React, { useRef, useState } from "react";
import "./SnippetCard.css";
import BootstrapEditSnippetForm from "../BootstrapEditSnippetForm/BootstrapEditSnippetForm.jsx";

const SnippetCard = ({
  title,
  tags,
  languageSelect,
  code,
  onSnippetDeleted,
  onSnippetEdited,
  snippetId,
  explanation,
  passPatchResponseObjectFromSnippetCardToSnippetList,
  getClassNameSuffix,
  lightMode
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const editRef = useRef(null);

  const handleEditSnippet = (e) => {
    e.preventDefault();
    handleShow()
  };

  const handleDeleteSnippet = (e, title) => {
    e.preventDefault();
    onSnippetDeleted(snippetId, title);
  };

  const onSnippetFormEdited = (responseSnippetObject, e) => {
    e.preventDefault();
    passPatchResponseObjectFromSnippetCardToSnippetList(responseSnippetObject);
  };

console.log(getClassNameSuffix(lightMode))
  
  return (
    <>
      <div className={`snippet-card${getClassNameSuffix(lightMode)}`}>
        <h1>{title}</h1>
        <h3>{tags}</h3>
        <h3>{languageSelect}</h3>
        <h3 className="code-snippet">{code}</h3>
        <h3>{explanation}</h3>
        <button
          className="edit-snippet-button"
          onClick={(e) => handleEditSnippet(e)}
        >
          Edit
        </button>
        <button
          className={`delete-snippet-button${getClassNameSuffix(lightMode)}`}
          onClick={(e) => handleDeleteSnippet(e, title)}
        >
          Delete
        </button>
      </div>
      {show &&
      <BootstrapEditSnippetForm
        editRef={editRef}
        onSnippetFormEdited={onSnippetFormEdited}
        snippetId={snippetId}
        title={title}
        languageSelect={languageSelect}
        code={code}
        explanation={explanation}
        show={show}
        setShow={setShow}
        onSnippetEdited={onSnippetEdited}
        getClassNameSuffix={getClassNameSuffix}
        lightMode={lightMode}
      />
    }
    </>
  );
};

export default SnippetCard;

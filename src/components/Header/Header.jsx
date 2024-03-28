import React, { useRef } from "react";
import SnippetForm from "./SnippetForm/SnippetForm";
import "./App.css"

const Header = ({ onSnippetAdded }) => {

  const dialogRef = useRef(null);

    const onAddButtonClick = () => {
        dialogRef.current.showModal();
    }

    const onSnippetFormSubmitted = (newSnippetObject) => {
        dialogRef.current.close()
        onSnippetAdded(newSnippetObject)
    }

  return (
      <header className="header">
        <h1 id="cli-companion-logo">💻CLI-Companion</h1>
        <div>
          <label>
            🔎 <input type="search" id="search-bar"></input>
            <button onClick={() => onAddButtonClick()}>+Add</button>
          </label>
        </div>
        <SnippetForm dialogRef={dialogRef} onSnippetFormSubmitted={onSnippetFormSubmitted}/>
      </header>
  );
};

export default Header;

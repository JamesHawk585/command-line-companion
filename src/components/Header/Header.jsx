import React, { useRef, useState } from "react";
import AddSnippetForm from "../AddSnippetForm/AddSnippetForm.jsx"
import '../../App.css';


const Header = ({ onSnippetAdded, snippetsFilteredBySearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const dialogRef = useRef(null);

    const onAddButtonClick = () => {
        dialogRef.current.showModal();
    }

    const onSnippetFormSubmitted = (newSnippetObject) => {
        dialogRef.current.close()
        onSnippetAdded(newSnippetObject)
    }

    console.log(searchTerm)

    snippetsFilteredBySearchTerm(searchTerm)

  return (
      <header className="header">
        <h1 id="cli-companion-logo">💻CLI-Companion</h1>
        <div>
          <label>
            🔎 <input type="search" id="search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button onClick={() => onAddButtonClick()}>+Add</button>
          </label>
        </div>
        <AddSnippetForm dialogRef={dialogRef} onSnippetFormSubmitted={onSnippetFormSubmitted}/>
      </header>
  );
};

export default Header;

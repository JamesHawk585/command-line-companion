import React, { useRef, useState } from "react";
import AddSnippetForm from "../AddSnippetForm/AddSnippetForm.jsx"
import '../../App.css';


const Header = ({ onSnippetAdded }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const dialogRef = useRef(null);

    const onAddButtonClick = () => {
        dialogRef.current.showModal();
    }

    const onSnippetFormSubmitted = (newSnippetObject) => {
        dialogRef.current.close()
        onSnippetAdded(newSnippetObject)
    }

    const handleSearch = (e) => {
      console.log(e.target.value)
      setSearchTerm(e.target.value)
      console.log(searchTerm)
    }

  return (
      <header className="header">
        <h1 id="cli-companion-logo">💻CLI-Companion</h1>
        <div>
          <label>
            🔎 <input type="search" id="search-bar" value={searchTerm} onChange={(e) => handleSearch(e)}></input>
            <button onClick={() => onAddButtonClick()}>+Add</button>
          </label>
        </div>
        <AddSnippetForm dialogRef={dialogRef} onSnippetFormSubmitted={onSnippetFormSubmitted}/>
      </header>
  );
};

export default Header;

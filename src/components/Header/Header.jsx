import React, { useRef, useState } from "react";
import AddSnippetForm from "../AddSnippetForm/AddSnippetForm.jsx"
import '../../App.css';


const Header = ({ onSnippetAdded, searchTerm, setSearchTerm }) => {

  const dialogRef = useRef(null);

    const onAddButtonClick = () => {
        dialogRef.current.showModal();
    }

    const onSnippetFormSubmitted = (newSnippetObject) => {
        dialogRef.current.close()
        onSnippetAdded(newSnippetObject)
    }

//  Controlled componenet = changing state causes the componenet to re-render. Comes with value={} and onChange={} jsx attributes. 
  return (
      <header className="header">
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

import React, { useRef, useState } from "react";
import AddSnippetForm from "../AddSnippetForm/AddSnippetForm.jsx"
import '../../App.css';
import './Header.css'


const Header = ({ onSnippetAdded, searchTerm, setSearchTerm, currentUserId }) => {

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
        <div id="search-bar-div">
          <label>
            🔎 <input type="search" id="search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button className="add-snippet-button" onClick={() => onAddButtonClick()}>+Add</button>
          </label>
        </div>
        <AddSnippetForm dialogRef={dialogRef} onSnippetFormSubmitted={onSnippetFormSubmitted} currentUseid={currentUserId}/>
      </header>
  );
};

export default Header;

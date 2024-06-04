import React, { useState, useEffect } from "react";
import SnippetCard from "../SnippetCard/SnippetCard";
import "./SnippetList.css"


const SnippetList = ({ filteredSnippets, onSnippetDeleted, onSnippetEdited, snippets, user }) => {

  const passPatchResponseObjectFromChildToParent = (responseSnippetObject) => {
    onSnippetEdited(responseSnippetObject)
  }


  // const updateUserId = () => {
  //   const newUserId = getCurrentUserFromSession();
  //   SetUser(newUserId)
  // }

  if (snippets.length == 0) {
    return (
    <h1 id="welcome-message">Welcome! Please click the add snippet button to get started!</h1>
    )
  }

  if (snippets.length > 0 && filteredSnippets.length == 0) {
    return (
      <h1>No snippets match search criteria</h1>
    )
  }

  const snippetCards = filteredSnippets.map((snippetObj, index) => {
    return (
        <SnippetCard
          key={index}
          snippetId={snippetObj.id}
          title={snippetObj.title}
          tags={snippetObj.tags}
          languageSelect={snippetObj.language_select}
          code={snippetObj.code}
          onSnippetDeleted={onSnippetDeleted}
          explanation={snippetObj.explanation}
          passPatchResponseObjectFromChildToParent={passPatchResponseObjectFromChildToParent}
        />
    );
  });



  return <>{snippetCards}</>;
};

export default SnippetList;

import React, { useState, useEffect } from "react";
import SnippetCard from "../SnippetCard/SnippetCard";
import "./SnippetList.css"

const SnippetList = ({ filteredSnippets, onSnippetDeleted, onSnippetEdited, snippets }) => {

  const passPatchResponseObjectFromChildToParent = (responseSnippetObject) => {
    onSnippetEdited(responseSnippetObject)
  }

  // If length of snippets == 0:
    // Welcome the user and tell them to add a snippet
  // If length of filteredSnippets == 0:
    // "Say no snippets found with current search settings"\
  // If snippets > 0 && filteredSnippets > 0:
  //  return SnippetCard

  console.log(snippets.length)
  console.log(filteredSnippets.length)

  if (snippets.length == 0) {
    return (
    <h1>Welcome! Please click the add snippet button to get started!</h1>
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

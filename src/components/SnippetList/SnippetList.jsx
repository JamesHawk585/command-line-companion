import React, { useState, useEffect } from "react";
import SnippetCard from "../SnippetCard/SnippetCard";
import "./SnippetList.css"

const SnippetList = ({ API, filteredSnippets, onSnippetDeleted, onSnippetEdited }) => {

  const passPatchResponseObjectFromChildToParent = (responseSnippetObject) => {
    onSnippetEdited(responseSnippetObject)
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

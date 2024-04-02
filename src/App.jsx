import "./App.css";
import Header from "./components/Header/Header.jsx";
import SnippetList from "./components/SnippetList/SnippetList.jsx";
import Home from "./components/Home/Home.jsx";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

const API = "http://127.0.0.1:5555/snippets";

export default () => {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => setSnippets(data));
  }, []);

  const onSnippetDeleted = async (snippetId, title) => {
    if (window.confirm(`Delete Snippet: "${title}"?`)) {
      setSnippets(snippets.filter((snippet) => snippet.id !== snippetId));
      const response = await fetch(`${API}/${snippetId}`, {
        method: "DELETE",
      });
    }
  };

  const onSnippetAdded = (snippetObj) => {
    return setSnippets([...snippets, snippetObj]);
  };

  const onSnippetEdited = (responseSnippetObject) => {
    console.log("onSnippetEdited", responseSnippetObject);
    setSnippets(
      snippets.map((snippet) => {
        if (snippet.id === responseSnippetObject.id) {
          return responseSnippetObject;
        } else {
          return snippet;
        }
      })
    );
  };

  const filteredSnippets = snippets.filter((snippet) => {
    return snippet.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log(filteredSnippets);

  return (
    <>
      <div className="app">
        <Home
          onSnippetAdded={onSnippetAdded}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          API={API}
          filteredSnippets={filteredSnippets}
          onSnippetEdited={onSnippetEdited}
          onSnippetDeleted={onSnippetDeleted}
        />
      </div>
    </>
  );
};

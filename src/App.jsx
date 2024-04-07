import "./App.css";
import Header from "./components/Header/Header.jsx";
import SnippetList from "./components/SnippetList/SnippetList.jsx";
import Authentication from "./components/Authentication/Authentication.jsx";
import Home from "./components/Home/Home.jsx";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";

const API = "http://127.0.0.1:5555/snippets";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user here
  });

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

  const updateUser = (user) => setUser(user);

  return (
    <>
      <div className="app">
        <Navigation />
        <Routes>
          <Route
            path={"/"}
            element={
              <div>
                <Home
                  onSnippetAdded={onSnippetAdded}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  API={API}
                  filteredSnippets={filteredSnippets}
                  onSnippetEdited={onSnippetEdited}
                  onSnippetDeleted={onSnippetDeleted}
                  onSnip
                />
              </div>
            }
          />
          <Route
            path={"/authentication"}
            element={
              <Authentication
                user={user}
                setUser={setUser}
                updateUser={updateUser}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};


export default App;
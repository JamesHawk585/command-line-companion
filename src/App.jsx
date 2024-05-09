import "./App.css";
import Header from "./components/Header/Header.jsx";
import SnippetList from "./components/SnippetList/SnippetList.jsx";
import Authentication from "./components/Authentication/Authentication.jsx";
import Home from "./components/Home/Home.jsx";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";



function App() {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null)


  const fetchSnippets = () => {
    fetch("/snippets")
      .then((r) => r.json())
      .then((data) => setSnippets(data));
  };

  const fetchUser = () => {
    fetch("/authorized")
    .then(r => {
      console.log(r)
      if(r.ok) {
        r.json().then(user => setUser(user))
      } else {
        r.json().then(err => setErrors(err))
      }
    })
  }


  useEffect(() => {
    fetchSnippets()
    fetchUser()
  }, [])

  const onSnippetDeleted = async (snippetId, title) => {
    if (window.confirm(`Delete Snippet: "${title}"?`)) {
      setSnippets(snippets.filter((snippet) => snippet.id !== snippetId));
      const response = await fetch(`/snippets/${snippetId}`, {
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

  console.log("user", user)

  if (!user) {
    return (
      <>
      <Navigation updateUser={updateUser} user={user}/>
      <Authentication updateUser={updateUser} user={user} setUser={setUser}/>
      </>
    )
  }

  return (
    <>
      <div className="app">
        <Navigation updateUser={updateUser}/>
        <Routes>
          <Route
            path={"/"}
            element={
              <div>
                <Home
                  onSnippetAdded={onSnippetAdded}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filteredSnippets={filteredSnippets}
                  onSnippetEdited={onSnippetEdited}
                  onSnippetDeleted={onSnippetDeleted}
                  snippets={snippets}
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
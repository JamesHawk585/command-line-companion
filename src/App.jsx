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



  
  const fetchUser = () => {
    fetch("/authorized")
    .then(r => {
      if(r.ok) {
        r.json().then(user => setUser(user))
      } else {
        r.json().then(err => setErrors(err))
      }
    })
  }
  
  function fetchSnippets() {
    fetch("/snippets")
      .then((r) => r.json())
      .then((data) => setSnippets(data));
      fetchUser()
  };

  console.log("User in App.jsx =======>", user)

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

  const updateUser = (user) => {
    if (user) {
      setUser(null)
    } else {
      fetchUser()
    };
  }




  if (!user) {
    return (
      <>
      <Navigation updateUser={updateUser} user={user} fetchUser={fetchUser}/>
      <Authentication updateUser={updateUser} user={user} setUser={setUser} fetchSnippets={fetchSnippets}/>
      </>
    )
  } else {
    const currentUserId = user.id
  return (
    <>
    <h1 className="nav-title">Command Line Companion 💻</h1>
      <div className="app">
        <Navigation updateUser={updateUser} fetchSnippets={fetchSnippets} setSnippets={setSnippets}/>
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
                  currentUserId={currentUserId}
                  user={user}
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
                fetchSnippets={fetchSnippets}
                setSnippets={setSnippets}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}};


export default App;
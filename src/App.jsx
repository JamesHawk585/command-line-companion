import "./";
import Header from "./components/Header/Header.jsx";
import SnippetList from "./components/SnippetList/SnippetList.jsx";
import Authentication from "./components/Authentication/Authentication.jsx";
import OffCanvasNavBar from "./components/OffCanvasNavBar/OffCanvasNavBar.jsx";
import Home from "./components/Home/Home.jsx";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);

const fetchUser = () => {
  fetch('/authorized').then(async (r) => {
    if (r.ok) {
      const responseUser = await r.json();
      setUser(responseUser)
    } else {
      try {
        const err = await r.json();
        setErrors(err);
      } catch (error) {
        console.error("Failed to fetch user", error)
        setErrors({message: "An error occued while fetching user in App.jsx"})
      }
    }
  })
}





  function fetchSnippets() {
    fetch("/snippets")
      .then((r) => r.json())
      .then((data) => setSnippets(data));
    fetchUser();
  }

  console.log("User in App.jsx =======>", user);

  useEffect(() => {
    fetchSnippets();
    fetchUser();
  }, []);

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
      setUser(null);
    } else {
      fetchUser();
      // setErrors(null)
    }
  };

  console.error(errors)

  if (!user) {
    return (
      <>
        {/* <Navigation updateUser={updateUser} user={user} fetchUser={fetchUser}/> */}
        <OffCanvasNavBar setSnippets={setSnippets} />
        <Authentication
          updateUser={updateUser}
          user={user}
          setUser={setUser}
          fetchSnippets={fetchSnippets}
        />
      </>
    );
  } else {
    const currentUserId = user.id;
    return (
      <>
        <div className="app">
          {/* <Navigation updateUser={updateUser} fetchSnippets={fetchSnippets} setSnippets={setSnippets}/> */}
          <OffCanvasNavBar setSnippets={setSnippets} />

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
  }
}

export default App;

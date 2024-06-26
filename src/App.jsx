import "./";
import Header from "./components/Header/Header.jsx";
import SnippetList from "./components/SnippetList/SnippetList.jsx";
import Authentication from "./components/Authentication/Authentication.jsx";
import OffCanvasNavBar from "./components/OffCanvasNavBar/OffCanvasNavBar.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import Home from "./components/Home/Home.jsx";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { GiKoala } from "react-icons/gi";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);

  const fetchUser = () => {
    fetch("/authorized").then(async (r) => {
      if (r.ok) {
        const responseUser = await r.json();
        setUser(responseUser);
      } else {
        try {
          const err = await r.json();
          setErrors(err);
        } catch (error) {
          console.error("Failed to fetch user", error);
          setErrors({
            message: "An error occued while fetching user in App.jsx",
          });
        }
      }
    });
  };

  function fetchSnippets() {
    fetch("/snippets")
      .then((r) => r.json())
      .then((data) => setSnippets(data));
    fetchUser();
  }

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

  const onSnippetAdded = (data) => {
    console.log(data);
    return setSnippets([...snippets, data]);
  };

  const onSnippetEdited = (responseSnippetObject) => {
    console.log(responseSnippetObject);
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

  // console.table(filteredSnippets);

  const updateUser = (handleClose) => {
    handleClose();
    console.log("Inside updateUser");
    console.log(user);
    console.log(typeof user);
    if (typeof user === Object) {
      setUser(null);
      console.log("Hit the setUsers(null) in updateUser");
    } else {
      fetchUser();
      // setErrors(null)
    }
  };

  const passDarkModeValueFromOffCanvasNavBarToApp = (darkMode) => {
    console.log("Dark mode in App.jsx!!! 🌙");
  };

  console.log(user);
  console.log(
    "%cdarkMode stateful value is being passed from OffCanvasNavbar to App.jsx. Each descendant component of App will need access to darkMode, as each component has it's own stylesheet. Consider passing darkMode down with useContext.",
    " color: orange"
  );

  if (!user) {
    return (
      <>
        <OffCanvasNavBar
          setSnippets={setSnippets}
          passDarkModeValueFromOffCanvasNavBarToApp={
            passDarkModeValueFromOffCanvasNavBarToApp
          }
        />
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
          <OffCanvasNavBar
            setSnippets={setSnippets}
            user={user}
            updateUser={updateUser}
            fetchUser={fetchUser}
            setUser={setUser}
            passDarkModeValueFromOffCanvasNavBarToApp={
              passDarkModeValueFromOffCanvasNavBarToApp
            }
          />

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
                    setSnippets={setSnippets}
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
            <Route
              path={"/UserProfile"}
              element={<UserProfile user={user} />}
            />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;

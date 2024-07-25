import "./";
import Header from "./components/Header/Header.jsx";
import SnippetList from "./components/SnippetList/SnippetList.jsx";
import EditProfilePasswordConfirm from "./components/EditProfilePasswordConfirm/EditProfilePasswordConfirm.jsx";
import Authentication from "./components/Authentication/Authentication.jsx";
import OffCanvasNavBar from "./components/OffCanvasNavBar/OffCanvasNavBar.jsx";
import BootstrapUserProfile from "./components/UserProfile/BootstrapUserProfile.jsx";
import Home from "./components/Home/Home.jsx";
import React, { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EditUserProfile from "./components/EditUserProfile/EditUserProfile.jsx";
import { GiKoala } from "react-icons/gi";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [lightMode, setLightMode] = useState(true);

  console.log(snippets)

  console.log("%cNavigate to UserProfile.jsx", "color: lightblue")

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
    return setSnippets([...snippets, data]);
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

  const getClassNameSuffix = (lightMode) => (lightMode ? "" : "-dark");

  // function getClassNameSuffix(lightMode) {
  //   if (lightMode === false) {
  //     return "-dark"
  //   }
  // }

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

  const htmlElement = document.getElementsByTagName("html")[0];
  const setHTMLLightMode = () => {
    if (lightMode == true) {
      htmlElement.style.backgroundColor = "#313a3c";
    } else if (lightMode === false) {
      htmlElement.style.backgroundColor = "white";
    }
  };

  if (!user) {
    return (
      <>
        <div className={`app${getClassNameSuffix(lightMode)}`}>
          <OffCanvasNavBar
            setSnippets={setSnippets}
            lightMode={lightMode}
            setLightMode={setLightMode}
            getClassNameSuffix={getClassNameSuffix}
            setHTMLLightMode={setHTMLLightMode}
          />
          <Authentication
            updateUser={updateUser}
            user={user}
            setUser={setUser}
            fetchSnippets={fetchSnippets}
            lightMode={lightMode}
            getClassNameSuffix={getClassNameSuffix}
            setHTMLLightMode={setHTMLLightMode}
          />
        </div>
      </>
    );
  } else {
    const currentUserId = user.id;
    return (
      <>
        <div className={`app${getClassNameSuffix(lightMode)}`}>
          <OffCanvasNavBar
            setSnippets={setSnippets}
            user={user}
            updateUser={updateUser}
            fetchUser={fetchUser}
            setUser={setUser}
            lightMode={lightMode}
            setLightMode={setLightMode}
            getClassNameSuffix={getClassNameSuffix}
            setHTMLLightMode={setHTMLLightMode}
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
                    lightMode={lightMode}
                    getClassNameSuffix={getClassNameSuffix}
                    setHTMLLightMode={setHTMLLightMode}
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
                  lightMode={lightMode}
                  getClassNameSuffix={getClassNameSuffix}
                  setHTMLLightMode={setHTMLLightMode}
                />
              }
            />
            <Route
              path={"/UserProfile"}
              element={
                <BootstrapUserProfile
                  user={user}
                  lightMode={lightMode}
                  getClassNameSuffix={getClassNameSuffix}
                  setHTMLLightMode={setHTMLLightMode}
                  snippets={snippets}
                />
              }
            />
            <Route
              path={"/EditUserProfile"}
              element={
                <EditUserProfile
                  lightMode={lightMode}
                  user={user}
                  getClassNameSuffix={getClassNameSuffix}
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

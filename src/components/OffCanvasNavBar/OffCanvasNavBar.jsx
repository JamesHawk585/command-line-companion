import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, createContext } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiFalloutShelter, GiHamburgerMenu } from "react-icons/gi";
import "./OffCanvasNavBar.css";
import darkModeIcon from "../../images/7148715_dark_mode_night_moon_icon (1).png";
import lightModeIcon from "../../images/sunny-day (3).png";
import UserProfile from "../UserProfile/UserProfile.jsx";
import ThemeContext from "/home/jph94880/development/code/projects/command-line-companion/client/src/App.jsx"

function OffCanvasNavBar({ setSnippets, user, updateUser, fetchUser, setUser,passDarkModeValueFromOffCanvasNavBarToApp, darkMode, setDarkMode }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();


  const handleLogout = () => {
    setShow(false);
    setUser(undefined)
    fetch("/logout", { method: "DELETE" })
      .then((r) => {
        console.log(r);
      }).then(() => {
      })
      .finally(() => {
        // Once the fetch operation is complete, clear snippets and navigate
        setSnippets([]);
        navigate("/authentication");
      });
  };

  const handleDarkModeClick = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
    {darkMode === true? (
      <div className="menu-and-site-title">
        {user === undefined? (
          <div id="hamburger-menu-placeholder"></div>
        ) : (
          <div className="hamburger-menu-wrapper" onClick={handleShow}>
            <GiHamburgerMenu size={48} />
          </div>
        )}
        <h1 className="site-title">Command Line Companion 💻</h1>
        
        <img src={lightModeIcon} alt="light mode" onClick={handleDarkModeClick} className="lightModeIcon"/>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header className="close-button" closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul>
              <li>
                <Link to="/" onClick={handleClose}>Home</Link>
              </li>
              <li>
                <Link to="/UserProfile" onClick={handleClose}>
                  Profile
                </Link>
              </li>
              <li className="logout-button">
                <Link to="/authentication" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    ) : (

      <div className="menu-and-site-title-dark">
        {user === undefined? (
          <div id="hamburger-menu-placeholder-dark"></div>
        ) : (
          <div className="hamburger-menu-wrapper-dark" onClick={handleShow}>
            <GiHamburgerMenu size={48} />
          </div>
        )}
        <h1 className="site-title-dark">Command Line Companion 💻</h1>
        
        <img src={darkModeIcon} alt="dark mode" onClick={handleDarkModeClick} className="darkModeIcon"/>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header className="close-button-dark" closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvas-body-dark">
            <ul>
              <li>
                <Link to="/" onClick={handleClose} className="home-link-dark">Home</Link>
              </li>
              <li>
                <Link to="/UserProfile" onClick={handleClose} className="profile-link-dark">
                  Profile
                </Link>
              </li>
              <li className="logout-button-dark">
                <Link to="/authentication" onClick={handleLogout} className="logout-link-dark">
                  Logout
                </Link>
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    )}
  </>
  )
}
        
        
      
export default OffCanvasNavBar;

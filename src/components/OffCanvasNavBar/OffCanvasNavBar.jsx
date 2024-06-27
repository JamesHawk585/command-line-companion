import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiFalloutShelter, GiHamburgerMenu } from "react-icons/gi";
import "./OffCanvasNavBar.css";
import darkModeIcon from "../../images/7148715_dark_mode_night_moon_icon (1).png";
import lightModeIcon from "../../images/sunny-day (3).png";
import UserProfile from "../UserProfile/UserProfile.jsx";

function OffCanvasNavBar({ setSnippets, user, updateUser, fetchUser, setUser }) {
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  console.log(user);

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
    console.log("Dark mode engaged!!!!🌒")
    setDarkMode(!darkMode)
  }

  return (
    <>
      <div className="menu-and-site-title">
        {user === undefined ? (
          <div id="hamburger-menu-placeholder"></div>
        ) : (
          <div className="hamburger-menu-wrapper" onClick={handleShow}>
            <GiHamburgerMenu size={30} />
          </div>
        )}

        <h1 className="site-title">Command Line Companion 💻</h1>

        {darkMode === true ? (
          <img src={lightModeIcon} alt="light mode" onClick={handleDarkModeClick} className="lightModeIcon"/>
        ) : (
          <img src={darkModeIcon} alt="dark mode" onClick={handleDarkModeClick} className="darkModeIcon"/>
        )}

      </div>
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
    </>
  );
}

export default OffCanvasNavBar;

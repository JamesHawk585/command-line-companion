import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiHamburgerMenu } from "react-icons/gi";
import "./OffCanvasNavBar.css";
import darkModeImage from "../../images/7148715_dark_mode_night_moon_icon (1).png";
import UserProfile from "../UserProfile/UserProfile.jsx";

function OffCanvasNavBar({ setSnippets, user, updateUser }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  console.log(user);

  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      console.log(r);
    });
    setSnippets([]);
    setShow(false);
    updateUser();
    navigate("/authentication");
  };

  const handleUserProfile = () => {
    navigate("/UserProfile");
  };

  return (
    <>
      <div className="menu-and-site-title">
        {user === undefined ? (
          <div></div>
        ) : (
          <div className="hamburger-menu-wrapper" onClick={handleShow}>
            <GiHamburgerMenu size={30} />
          </div>

        )}

        {/* <div className="hamburger-menu-wrapper" onClick={handleShow}>
          <GiHamburgerMenu size={30} />
        </div> */}

        <h1 className="site-title">Command Line Companion 💻</h1>
        <img src={darkModeImage} alt="dark mode" />
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header className="close-button" closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/UserProfile" onClick={handleUserProfile}>
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

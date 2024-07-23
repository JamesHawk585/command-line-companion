import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, createContext } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiFalloutShelter, GiHamburgerMenu } from "react-icons/gi";
import "./OffCanvasNavBar.css";
import darkModeIcon from "../../images/7148715_dark_mode_night_moon_icon (1).png";
import lightModeIcon from "../../images/sunny-day (3).png";

function OffCanvasNavBar({ setSnippets, user, updateUser, fetchUser, setUser,passDarkModeValueFromOffCanvasNavBarToApp, lightMode, setLightMode, getClassNameSuffix, setHTMLLightMode }) {
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


  const handleLightModeClick = (event) => {
    setHTMLLightMode()
    setLightMode(!lightMode)
  }

  const setThemeIcon = () => {
    if (lightMode === true) {
      return lightModeIcon
    } else if (lightMode === false) {
      return darkModeIcon
    }
  }

  const setThemeIconClassName = (lightMode) => (lightMode ? "lightModeIcon" : "darkModeIcon") 

  return (
    <>
      <div className={`menu-and-site-title${getClassNameSuffix(lightMode)}`}>
        {user === undefined? (
          <div id="hamburger-menu-placeholder"></div>
        ) : (
          <div className={`hamburger-menu-wrapper${getClassNameSuffix(lightMode)}`} onClick={handleShow}>
            <GiHamburgerMenu size={48} />
          </div>
        )}
        <h1 className={`hamburger-menu-wrapper${getClassNameSuffix(lightMode)}`}>Command Line Companion 💻</h1>
        
        
        <img src={setThemeIcon()} alt="theme icon" onClick={handleLightModeClick} className={setThemeIconClassName(lightMode)}/>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header className={`offcanvas-header${getClassNameSuffix(lightMode)}`} closeButton>


            
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header >
          <Offcanvas.Body className={`offcanvas-body${getClassNameSuffix(lightMode)}`}>
            <ul>
              <li>
                <Link to="/" onClick={handleClose} className={`home-link${getClassNameSuffix(lightMode)}`}>Home</Link>
              </li>
              <li>
                <Link to="/UserProfile" onClick={handleClose} className={`user-profile-link${getClassNameSuffix(lightMode)}`}>
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
  </>
  )
}
        
        
      
export default OffCanvasNavBar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GiHamburgerMenu } from "react-icons/gi";
import "./OffCanvasNavBar.css"


function OffCanvasNavBar({ setSnippets }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/logout', {method: "DELETE"})
    .then(r => {
      console.log(r)
      
    })
    setSnippets([])
    navigate("/authentication");
  };

  return (
    <>
    <div class="menu-and-site-title">
      <div className="hamburger-menu-wrapper" onClick={handleShow}>
            <GiHamburgerMenu size={30} />
          </div>
      <h1 className="site-title">Command Line Companion 💻</h1>
    </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
          <li>
              <Link to="/" onClick={() => setMenu(!menu)}>Home</Link>
            </li>
            <li>
              <Link to="/authentication" onClick={() => setMenu(!menu)}>Login/Signup</Link>
            </li>
            <li className="logout-button" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasNavBar;
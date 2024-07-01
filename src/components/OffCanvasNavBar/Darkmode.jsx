import React from 'react'

const Darkmode = () => {

    
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
          ) : null}
        </>
      );
      
}

export default Darkmode
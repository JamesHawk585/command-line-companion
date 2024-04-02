import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "../Home/Home.jsx";
import Authentication from "../Authentication/Authentication.jsx";
import { GiHamburgerMenu } from "react-icons/gi";

const Navigation = () => {
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("handleLogout");
    navigate("/");
  };

  const toggleMenu = () => setMenu((prev) => !prev);

  return (
    <div className="navigation">
      <h1 className="nav-title">Command-Line-Companion</h1>
      <section className="nav-menu">
        {menu ? (
          <ul>
            <li className="close-button" onClick={() => setMenu(!menu)}>
              x
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/authenticate">Login/Signup</Link>
            </li>
            <li className="logout-button" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </li>
          </ul>
        ) : (
          <div className="hamburger-menu-wrapper" onClick={toggleMenu}>
            <GiHamburgerMenu size={30} />
          </div>
        )}
      </section>
    </div>
  );
};

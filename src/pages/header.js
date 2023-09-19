/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { FaUserCircle, FaBars } from "react-icons/fa";
 // Assurez-vous d'importer vos styles CSS pour personnaliser le menu

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
    <div className={`side-menu ${expanded ? "expanded" : ""}`}>
      <div className="toggle-button" onClick={toggleExpanded}>
        <FaBars />
      </div>
      <Nav
        defaultActiveKey="/"
        className={`flex-column side-menu-nav ${
          expanded ? "expanded" : ""
        }`}
        onSelect={() => setExpanded(false)}
      >
        <div className="logo">
          <Link to="/">
            <img src="facture5.png" alt="Logo" width="100" height="50" />
          </Link>
        </div>
        <Nav.Item>
          <Nav.Link as={Link} to="/" eventKey="home">
            Accueil
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/page2" eventKey="page2">
            Prestataire
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/page_accueil" eventKey="page_accueil">
            Page
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title={<FaUserCircle />} id="basic-nav-dropdown">
          <NavDropdown.Item href="#">Nom d'utilisateur</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#" onClick={handleLogout}>Déconnexion</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default Header;*/
/*import React from "react";
import { Link } from "react-router-dom";

import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { FaUserCircle, FaBars } from "react-icons/fa";
 // Assurez-vous d'importer vos styles CSS pour personnaliser le menu

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
    <div className={`side-menu ${expanded ? "expanded" : ""}`}>
      <div className="toggle-button" onClick={toggleExpanded}>
        <FaBars />
      </div>
      <Nav
        defaultActiveKey="/"
        className={`flex-column side-menu-nav ${
          expanded ? "expanded" : ""
        }`}
        onSelect={() => setExpanded(false)}
      >
        <div className="logo">
          <Link to="/">
            <img src="facture5.png" alt="Logo" width="100" height="50" />
          </Link>
        </div>
        <Nav.Item>
          <Nav.Link as={Link} to="/" eventKey="home">
            Accueil
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/page2" eventKey="page2">
            Prestataire
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/page_accueil" eventKey="page_accueil">
            Page
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title={<FaUserCircle />} id="basic-nav-dropdown">
          <NavDropdown.Item href="#">Nom d'utilisateur</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#" onClick={handleLogout}>Déconnexion</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default Header;*/
import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
const header = () => {

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
      
        <Link className="navbar-brand" to="/">
        <img src="facture5.png" alt="Logo"  width="100" height="50"/>
          
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/page2">
                Prestataire
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adduser">
                User
              </Link>
            </li>
          </ul>
        </div>
        <Nav className="ml-auto">
          <NavDropdown title={<FaUserCircle />} id="basic-nav-dropdown">
            <NavDropdown.Item href="#">Nom d'utilisateur</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout} href="#">Déconnexion</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
    </nav>
  );
};

export default header;

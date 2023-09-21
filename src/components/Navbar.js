import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Nav, NavDropdown, Button } from 'react-bootstrap';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
    <>
      <IconContext.Provider value={{ color: '#000' }}>
      <div className='navbar'>
  <div className='d-flex justify-content-between'>
    <Link to='#' className='menu-bars'>
      <FaIcons.FaBars onClick={showSidebar} />
    </Link> 
    <span style={{ marginLeft: '550px' }}>
      <img src="facture5.png" alt="Logo" width="100" height="50" />
    </span>
  </div>
  <div className="flex-grow-1"></div>
  <Nav className="ml-auto">
    <Button variant="dark">
    <NavDropdown title="hadjer bachasais " id="user-dropdown">
      <NavDropdown.Item href="#">Profil</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout} href="#">Déconnexion</NavDropdown.Item>
    </NavDropdown>
    </Button>
  </Nav>
</div>



        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li> 
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
           
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

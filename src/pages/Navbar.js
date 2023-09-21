import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Button } from 'react-bootstrap';
import { FaAngleDown } from 'react-icons/fa';


function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  const customButtonStyle = {
    backgroundColor: '#FC732E',
    border: '2px solid #FC732E',
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
  <div className="user-dropdown">
  <Button  style={customButtonStyle}>
    <span className="user-name">Hadjer Bachasais</span>
    <FaAngleDown className="dropdown-icon" />
  </Button>
  <div className="dropdown-content">
    <Button variant="disabled">Profil</Button>
    <hr />
    <Button variant="disabled" onClick={handleLogout}>Déconnexion</Button>
  </div>
</div>
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

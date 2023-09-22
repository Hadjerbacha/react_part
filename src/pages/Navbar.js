import React, { useState, useEffect, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Button } from 'react-bootstrap';
import { FaAngleDown } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';


const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const customButtonStyle = {
    backgroundColor: '#FC732E',
    border: '2px solid #FC732E',
    // Autres styles personnalisés que vous souhaitez ajouter
  };
  useEffect(() => {
    // Récupérer le jeton JWT depuis le stockage local
    const token = localStorage.getItem('token');
    console.log("tokennnnnnnn", token)

    if (token) {
      // Déchiffrer le jeton JWT pour obtenir les informations de l'utilisateur
      const decodedUser = jwtDecode(token);
      console.log("user", decodedUser)

      // Mettre à jour l'état avec les informations de l'utilisateur décodé
      setUserId(decodedUser.userId);
    }
  }, []);

  useEffect(() => {
    // Charger les utilisateurs depuis l'API
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    // Rechercher l'utilisateur correspondant lors du chargement du composant
    if (userId && users.length > 0) {
      const foundUser = users.find(user => user._id === userId);
      if (foundUser) {
        setCurrentUser(foundUser);
      }
    }
  }, [userId, users]);

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Définissez vos éléments de menu en fonction du rôle de l'utilisateur
  let sidebarItems = [
    {
      title: 'Accueil',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Ajouter Prestataire',
      path: '/prestataire',
      icon: <FaIcons.FaPlus />,
      cName: 'nav-text'
    },
    {
      title: 'Ajouter utilisateur',
      path: '/adduser',
      icon: <FaIcons.FaPlus />,
      cName: 'nav-text'
    },
    {
      title: 'Consulter utilisateurs',
      path: '/consulte',
      icon: <FaIcons.FaUsers />,
      cName: 'nav-text'
    },
    {
      title: 'Tableau de bord',
      path: '/tableau_bord',
      icon: <FaIcons.FaChartLine />,
      cName: 'nav-text'
    },
    {
      title: 'Archive',
   //  path: '/archive',
      path: currentUser?.role === 'admin' ? '/archive' : '/archiveUser',

      icon: <FaIcons.FaArchive />,
      cName: 'nav-text'
    }
  ];

  // Si l'utilisateur est un administrateur, ajoutez des éléments spécifiques
 /* if (currentUser && currentUser.role === 'admin') {
    sidebarItems.push(
      {
        title: 'Archive',
        path: '/archive',
        icon: <FaIcons.FaArchive />,
        cName: 'nav-text'
      }
    );
  }*/

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
  <span className="user-name">{currentUser?.firstName} {currentUser?.lastName}</span>
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
            {sidebarItems.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;


/*


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
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState( "");
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    // Fonction à exécuter au chargement de la page
    (function () {
    })();
    // Récupérer le jeton JWT depuis le stockage local
    const token = localStorage.getItem('token');
    console.log("tokennnnnnnn",token)

    if (token) {
      // Déchiffrer le jeton JWT pour obtenir les informations de l'utilisateur
      const decodedUser = jwtDecode(token);
      console.log("user",decodedUser)

      // Mettre à jour l'état avec les informations de l'utilisateur décodé
      setUserId(decodedUser.userId);
      console.log("userid",userId)
    }
  }, [],
 
    useEffect(() => {
        fetch('http://localhost:5000/api/users')
          .then(response => response.json())
          .then(data => {
            setUsers(data);
            console.log("userssssssssss",users)
          })
         
          .catch(error => console.error('Error fetching factures:', error));
      }, []),
      
      useEffect(() => {
       
        // Rechercher l'utilisateur correspondant lors du chargement du composant
        for (const user of users) {
          if (user._id === userId) {
            console.log("trouvé")
            setCurrentUser(user);
            console.log("trouvé user ",currentUser)
            break; // Une fois que l'utilisateur est trouvé, sortir de la boucle
          }   
          console.log("cuuuuuuuuuuuurent",currentUser)
        }
      }, [userId, users])
    
   
      );

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
    <span className="user-name"> Name</span>
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

export default Navbar;*/

import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Tablepage from "./pages/TablePage"; 
import Prestataire from "./pages/prestataire";
import Adduser from "./pages/adduser";
import ArchivePage from "./pages/archive";
import Consulte from "./pages/consulte";
import ArchiveUser from "./pages/archiveUser";
import Fournisseur from "./pages/fournisseur";
import jwtDecode from 'jwt-decode';
import Line from './pages/Line';

function App() {
	const user = localStorage.getItem("token");
	const [userId, setUserId] = useState("");
	const [currentUser, setCurrentUser] = useState(null);
	const [users, setUsers] = useState([]);

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

	return (
		<Routes>
		 {user ? (
    currentUser?.role === 'admin' ? (
      <Route path="/" exact element={<Consulte />} />
    ) : currentUser?.role === 'user' ? (
      <Route path="/" exact element={<Tablepage />} />
    ) : (
      <Route path="/" exact element={<Login />} />
    )
  ) : (
    <Route path="/" exact element={<Login />} />
  )}
			<Route path="/prestataire" exact element={<Prestataire />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/line" element={<Line />} />
			<Route path="/adduser" exact element={<Adduser />} />
			<Route path="/archive" exact element={<ArchivePage />} />
			<Route path="/archiveUser" exact element={<ArchiveUser />} />
			<Route path="/consulte" exact element={<Consulte />} />
			<Route path="/fournisseur" exact element={<Fournisseur />} />
		</Routes>
	);
}
 
export default App;
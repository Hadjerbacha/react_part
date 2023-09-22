import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import jwtDecode from 'jwt-decode';


function ArchiveUser() {
  const years = Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => new Date().getFullYear() - i);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [factures, setFactures] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleUserButtonClick = (userId) => {
    setSelectedUserId(userId);
  };
  const [userId, setUserId] = useState( "");
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
    }
  }, []);
  const handleDownloadClick = () => {
    if (!selectedYear) {
      // L'année n'est pas sélectionnée, vous pouvez afficher un message d'erreur ici.
      return;
    }

    // ... Votre logique de téléchargement CSV
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        console.log("uuuuusrs", data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/facture')
      .then(response => response.json())
      .then(data => setFactures(data))
      .catch(error => console.error('Error fetching factures:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <br /><br />
      <div className="content">
        <div>
      
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ margin: '0 10px ' }}></div> 
  <Select
    placeholder="Sélectionner l'année"
    options={years.map((year) => ({
      label: year,
      value: year,
    }))}
    onChange={(selectedYear) => handleYearClick(selectedYear.value)}
  />
  <div style={{ margin: '0 10px  ' }}></div> {/* Espace horizontal de 10 pixels */}
 
</div>

          <table className="table">
            <thead>
              <tr>
                <th>
                 N de facture 
                </th>
                <th>
                Prestataire
                </th>
              </tr>
            </thead>
            <tbody>
            {factures
  .filter((facture) => {
    const factureYear = new Date(facture.Datefacture).getFullYear();
    return (selectedYear === null || factureYear === selectedYear) && (facture.userId === userId);
  })
  .map((facture) => (
    <tr key={facture.N}>
      <td>{facture.N}</td>
      <td>{facture.Prestataire_fournisseur}</td>
    </tr>
  ))}
            </tbody>
          </table>
          <Button variant="success" onClick={handleDownloadClick}>
            Télécharger
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ArchiveUser;
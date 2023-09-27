/*import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Navbar from './Navbar';

const users = ['ADNANE', 'SAADI', 'LAIMECHE', 'BIRI', 'CHETTIBI', 'MEDDAH'];

const initialData = {
  ADNANE: [
    {
      numero: '1',
      prestataire: 'Prestataire 1',
      factureNumero: 'FAC001',
      dateFacture: '01/01/2023',
      montant: '1000€',
      // Ajoutez les autres données de la facture ici
    },
    // Ajoutez d'autres factures pour l'utilisateur ADNANE ici
  ],
  SAADI: [
    {
      numero: '1',
      prestataire: 'Prestataire 2',
      factureNumero: 'FAC002',
      dateFacture: '02/01/2023',
      montant: '800€',
      // Ajoutez les autres données de la facture ici
    },
    // Ajoutez d'autres factures pour l'utilisateur SAADI ici
  ],
  // Ajoutez d'autres utilisateurs avec leurs factures ici
};

const Consulte = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <Navbar />
      <br/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
  {users.map((user, index) => (
    <React.Fragment key={user}>
      <Button
        variant="primary"
        onClick={() => handleUserClick(user)}
      >
        {user}
      </Button>
      {index < users.length - 1 && <span style={{ marginRight: '10px' }} />}
    </React.Fragment>
  ))}
</div>
 
<br/><br/>
      {selectedUser && (
        <div className="user-table" style={{ margin: '0 10px' }}>
          
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>N°</th>
                <th>Prestataire/Fournisseur</th>
                <th>Facture N°</th>
                <th>Date Facture</th>
                <th>Montant</th>
                <th>Bon de Commande ou Contrat N°</th>
                <th>Transmis à DPT le</th>
                <th>Transmis à DFC le</th>
                <th>Observations</th>
                <th>Imputation</th>
                <th>Fichier</th>
                <th>Date et N° de virement</th>
                <th>Arrivée le</th>
              </tr>
            </thead>
            <tbody>
              {initialData[selectedUser].map((facture, index) => (
                <tr key={index}>
                  <td>{facture.numero}</td>
                  <td>{facture.prestataire}</td>
                  <td>{facture.factureNumero}</td>
                  <td>{facture.dateFacture}</td>
                  <td>{facture.montant}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Consulte;*/
/*
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Navbar from './Navbar';
function Consulte() {
  const [factures, setFactures] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Récupérer toutes les factures
    fetch('http://localhost:5000/api/facture')
      .then(response => response.json())
      .then(data => setFactures(data))
      .catch(error => console.error('Error fetching factures:', error));

    // Récupérer tous les utilisateurs
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleUserButtonClick = (userId) => {
    setSelectedUserId(userId);
  };

  // Organiser les factures par userId
  const facturesParUtilisateur = {};

  factures.forEach(facture => {
    if (!facturesParUtilisateur[facture.userId]) {
      facturesParUtilisateur[facture.userId] = [];
    }
    facturesParUtilisateur[facture.userId].push(facture);
  });

  return (
    <div>
      <Navbar />
      <br/>
      <div className="mx-auto" style={{ maxWidth: "95%" }}>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          {users.map((user, index) => (
            <React.Fragment key={user}>
              <Button
                key={user._id}
                variant="primary"
                onClick={() => handleUserButtonClick(user._id)}
              >
                {user.lastName}
              </Button>
              {index < users.length - 1 && <span style={{ marginRight: '10px' }} />}
    </React.Fragment>
          ))}
          
        </div>
        <br/>
        {selectedUserId && (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Prestataire/Fournisseur</th>
                  <th>Facture N°</th>
                  <th>Date Facture</th>
                  <th>Montant</th>
                  <th>Bon de Commande ou Contrat N°</th>
                  <th>Transmis à DPT le</th>
                  <th>Transmis à DFC le</th>
                  <th>Observations</th>
                  <th>Imputation</th>
                  <th>Fichier</th>
                  <th>Date et N° de virement</th>
                  <th>Arrivée le</th>
                </tr>
              </thead>
              <tbody>
                {facturesParUtilisateur[selectedUserId].map((facture, index) => (
                  <tr key={facture._id}>
                    <td>{facture.N}</td>
                    <td>{facture.Prestataire_fournisseur}</td>
                    <td>{facture.factureN}</td>
                    <td>{facture.Datefacture}</td>
                    <td>{facture.montant}</td>
                    <td>{facture.bonCommande}</td>
                    <td>{facture.transmisDPT}</td>
                    <td>{facture.transmisDFC}</td>
                    <td>{facture.observations}</td>
                    <td>{facture.imputation}</td>
                    <td>{facture.fichier}</td>
                    <td>{facture.dateVirement}</td>
                    <td>{facture.arrivee}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Consulte;*/
/*
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Navbar from './Navbar';

function Consulte() {
  const [factures, setFactures] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Récupérer toutes les factures
    fetch('http://localhost:5000/api/facture')
      .then(response => response.json())
      .then(data => setFactures(data))
      .catch(error => console.error('Error fetching factures:', error));

    // Récupérer tous les utilisateurs
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleUserButtonClick = (userId) => {
    setSelectedUserId(userId);
  };

  // Organiser les factures par userId
  const facturesParUtilisateur = {};

  factures.forEach(facture => {
    if (!facturesParUtilisateur[facture.userId]) {
      facturesParUtilisateur[facture.userId] = [];
    }
    facturesParUtilisateur[facture.userId].push(facture);
  });

  return (
    <div>
      <Navbar />
      <br/>
      <div className="mx-auto" style={{ maxWidth: "95%" }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          {users.map((user, index) => (
            <React.Fragment key={user}>
              <Button
                key={user._id}
                variant="primary"
                onClick={() => handleUserButtonClick(user._id)}
              >
                {user.lastName}
              </Button>
              {index < users.length - 1 && <span style={{ marginRight: '10px' }} />}
            </React.Fragment>
          ))}
        </div>
        <br/>
        {selectedUserId && (
          <div>
            {facturesParUtilisateur[selectedUserId] && facturesParUtilisateur[selectedUserId].length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Prestataire/Fournisseur</th>
                    <th>Facture N°</th>
                    <th>Date Facture</th>
                    <th>Montant</th>
                    <th>Bon de Commande ou Contrat N°</th>
                    <th>Transmis à DPT le</th>
                    <th>Transmis à DFC le</th>
                    <th>Observations</th>
                    <th>Imputation</th>
                    <th>Fichier</th>
                    <th>Date et N° de virement</th>
                    <th>Arrivée le</th>
                  </tr>
                </thead>
                <tbody>
                  {facturesParUtilisateur[selectedUserId].map((facture, index) => (
                    <tr key={facture._id}>
                      <td>{facture.N}</td>
                      <td>{facture.Prestataire_fournisseur}</td>
                      <td>{facture.factureN}</td>
                      <td>{facture.Datefacture}</td>
                      <td>{facture.montant}</td>
                      <td>{facture.bonCommande}</td>
                      <td>{facture.transmisDPT}</td>
                      <td>{facture.transmisDFC}</td>
                      <td>{facture.observations}</td>
                      <td>{facture.imputation}</td>
                      <td>{facture.fichier}</td>
                      <td>{facture.dateVirement}</td>
                      <td>{facture.arrivee}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Aucune facture pour cet utilisateur.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Consulte;*/

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import Navbar from './Navbar';

function Consulte() {
  const [factures, setFactures] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userid, setUserId] = useState("");

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

  useEffect(() => {
    // Récupérer toutes les factures
    fetch('http://localhost:5000/api/facture')
      .then(response => response.json())
      .then(data => setFactures(data))
      .catch(error => console.error('Error fetching factures:', error));

    // Récupérer tous les utilisateurs
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleUserButtonClick = (userId) => {
    setSelectedUserId(userId);
  };

  // Filtrer les utilisateurs ayant "admin" comme nom de famille
  const filteredUsers = users.filter(user => user.role !== 'admin' && user._id !== userid );

  // Organiser les factures par userId
  const facturesParUtilisateur = {};

  factures.forEach(facture => {
    if (!facturesParUtilisateur[facture.userId]) {
      facturesParUtilisateur[facture.userId] = [];
    }
    facturesParUtilisateur[facture.userId].push(facture);
  });

  return (
    <div>
      <Navbar />
      <br/>
      <div className="mx-auto" style={{ maxWidth: "95%" }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          {filteredUsers.map((user, index) => (
            <React.Fragment key={user}>
              <Button
                key={user._id}
                variant="primary"
                onClick={() => handleUserButtonClick(user._id)}
              >
                {user.lastName}
              </Button>
              {index < filteredUsers.length - 1 && <span style={{ marginRight: '10px' }} />}
            </React.Fragment>
          ))}
        </div>
        <br/>
        {selectedUserId && (
          <div>
            {facturesParUtilisateur[selectedUserId] && facturesParUtilisateur[selectedUserId].length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Prestataire/Fournisseur</th>
                    <th>Facture N°</th>
                    <th>Date Facture</th>
                    <th>Montant</th>
                    <th>Bon de Commande ou Contrat N°</th>
                    <th>Transmis à DPT le</th>
                    <th>Transmis à DFC le</th>
                    <th>Observations</th>
                    <th>Imputation</th>
                    <th>Fichier</th>
                    <th>Date et N° de virement</th>
                    <th>Arrivée le</th>
                  </tr>
                </thead>
                <tbody>
                  {facturesParUtilisateur[selectedUserId].map((facture, index) => (
                    <tr key={facture._id}>
                      <td>{facture.N}</td>
                      <td>{facture.Prestataire_fournisseur}</td>
                      <td>{facture.factureN}</td>
                      <td>{facture.Datefacture}</td>
                      <td>{facture.montant}</td>
                      <td>{facture.bonCommande}</td>
                      <td>{facture.transmisDPT}</td>
                      <td>{facture.transmisDFC}</td>
                      <td>{facture.observations}</td>
                      <td>{facture.imputation}</td>
                      <td>{facture.fichier}</td>
                      <td>{facture.dateVirement}</td>
                      <td>{facture.arrivee}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>Aucune facture pour cet utilisateur.</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Consulte;





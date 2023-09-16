import React, { useState } from 'react';
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
          {/*<h2>Tableau de Factures pour {selectedUser}</h2>*/}
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

export default Consulte;

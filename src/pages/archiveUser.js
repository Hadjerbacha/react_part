import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button, Table, Modal } from 'react-bootstrap';
import Select from 'react-select';
import jwtDecode from 'jwt-decode';
import ExcelJS from 'exceljs';


function ArchiveUser() {
  const years = Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => new Date().getFullYear() - i);
 
  const [factures, setFactures] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearClick = (year) => {
    setSelectedYear(year);
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
  const [showErroorModal, setShowErroorModal] = useState(false);
  const [erroorMessage, setErroorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const exportToExcel = () => {
    if (!selectedYear) {
      // L'année n'est pas sélectionnée, vous pouvez afficher un message d'erreur ici.
      setErroorMessage("L'année n'est pas sélectionnée");
      setShowErroorModal(true);
      return;
    }
  
    // Filtrer les factures en fonction de l'année sélectionnée
    const filteredFactures = factures.filter((facture) => {
      const factureYear = new Date(facture.Datefacture).getFullYear();
      return factureYear === selectedYear;
    });
  
    if (filteredFactures.length === 0) {
      // Aucune facture pour cette année, affichez un message d'erreur si nécessaire.
      setErrorMessage(`Aucune facture trouvée pour l'année ${selectedYear}.`);
      setShowErrorModal(true);
      return;
    }
  
    // Créez un nouveau classeur Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Factures');
  
    // Définissez les en-têtes de colonne
    worksheet.columns = [
      { header: 'N°', key: 'N', width: 10 },
      { header: 'Prestataire/Fournisseur', key: 'Prestataire_fournisseur', width: 30 },
      { header: 'Facture N°', key: 'factureN', width: 15 },
      { header: 'Date Facture', key: 'Datefacture', width: 15 },
      { header: 'Montant', key: 'montant', width: 15 },
      { header: 'Bon de Commande ou Contrat N°', key: 'bonCommande', width: 30 },
      { header: 'Transmis à DPT le', key: 'transmisDPT', width: 20 },
      { header: 'Transmis à DFC le', key: 'transmisDFC', width: 20 },
      { header: 'Observations', key: 'observations', width: 15 },
      { header: 'Imputation', key: 'imputation', width: 15 },
      { header: 'Fichier', key: 'fichier', width: 15 },
      { header: 'Date et N° de virement', key: 'dateVirement', width: 30 },
      { header: 'Arrivée le', key: 'arrivee', width: 15 },
    ];
  
    // Ajoutez les données à la feuille de calcul
    filteredFactures.forEach((facture) => {
      worksheet.addRow({
        N: facture.N,
        Prestataire_fournisseur: facture.Prestataire_fournisseur,
        factureN: facture.factureN,
        Datefacture: facture.Datefacture,
        montant: facture.montant,
        bonCommande: facture.bonCommande,
        transmisDPT: facture.transmisDPT,
        transmisDFC: facture.transmisDFC,
        observations: facture.observations,
        imputation: facture.imputation,
        fichier: facture.fichier,
        dateVirement: facture.dateVirement,
        arrivee: facture.arrivee,
      });
    });
  
    // Générez un blob à partir du classeur Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      // Créez un URL d'objet à partir du blob
      const url = window.URL.createObjectURL(blob);
  
      // Créez un lien d'exportation
      const a = document.createElement('a');
      a.href = url;
      a.download = `Factures_annee_${selectedYear}.xlsx`;
      a.click();
  
      // Libérez l'URL d'objet
      window.URL.revokeObjectURL(url);
    });
  };

  console.log("utilisateurs:", users);
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
<div style={{ marginLeft: '80%' }}></div> 
  <Button variant="success" onClick={exportToExcel}>
            Télécharger
          </Button>
</div>
<br/>
          <Table striped bordered hover style={{ width: '98%', margin: '0 auto' }}>
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
            {factures
  .filter((facture) => {
    const factureYear = new Date(facture.Datefacture).getFullYear();
    return (selectedYear === null || factureYear === selectedYear) && (facture.userId === userId);
  })
  .map((facture) => (
    <tr key={facture.N}>
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
        <Modal show={showErroorModal} onHide={() => setShowErroorModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Erreur</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {erroorMessage}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowErroorModal(false)}>
      Fermer
    </Button>
  </Modal.Footer>
</Modal>

        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Erreur</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {errorMessage}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
      Fermer
    </Button>
  </Modal.Footer>
</Modal>

      </div>
    </div>
  );
}

export default ArchiveUser;
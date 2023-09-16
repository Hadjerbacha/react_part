import React, { useState, useEffect, useRef } from 'react';
import { Modal, Table, Button, Form } from 'react-bootstrap';
import handleExportToExcel from './excel';
import Select from 'react-select';
import handleDelete from './delete_fac';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash, faFilePdf, faPrint, faFileExcel, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../style/style.css';
//import EditModal, { handleEdit } from './edit_fac'; 
import jsPDF from 'jspdf'; 
import { useReactToPrint } from 'react-to-print'; 
import axios from 'axios';

function TablePage() {
  const [showModal, setShowModal] = useState(false);
  const [factures, setFactures] = useState([]);
  const [formData, setFormData] = useState({
    N: '',
    Prestataire_fournisseur: '',
    factureN: '',
    Datefacture: '',
    montant: '',
    bonCommande: '',
    transmisDPT: '',
    transmisDFC: '',
    observations: '',
    imputation: '',
    fichier: '',
    dateVirement: '',
    arrivee: '',

  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  

  function generateInvoiceNumber(num) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const invoiceNumber = String(num).padStart(3, '0') + '-' + String(month) + '/' + String(year);
    return invoiceNumber;
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/facture')
      .then(response => response.json())
      .then(data => setFactures(data))
      .catch(error => console.error('Error fetching factures:', error));
  }, []);
    useEffect(() => {
      const results = factures.filter(facture =>
        (facture.N && facture.N.toString().includes(searchTerm)) ||
        (facture.Prestataire_fournisseur && facture.Prestataire_fournisseur.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (facture.factureN && facture.factureN.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (facture.Datefacture && facture.Datefacture.includes(searchTerm)) ||
        (facture.montant && facture.montant.toString().includes(searchTerm))||
        (facture.bonCommande && facture.bonCommande.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (facture.transmisDPT && facture.transmisDPT.includes(searchTerm))||
        (facture.transmisDFC && facture.transmisDFC.includes(searchTerm))||
        (facture.observations && facture.observations.includes(searchTerm))||
        (facture.imputation && facture.imputation.includes(searchTerm))||
        (facture.fichier && facture.fichier.includes(searchTerm))||
        (facture.dateVirement && facture.dateVirement.includes(searchTerm))|| 
        (facture.arrivee && facture.arrivee.includes(searchTerm))
      );
      setSearchResults(results);
    }, [searchTerm, factures]); 
    
  const handleExportToExcelClick = () => { handleExportToExcel(searchResults); };
  
  const handleShowModal = () => { setShowModal(true); };
  
  const handleCloseModal = () => { setShowModal(false);};
  
 /* const handleAdd = () => {
    fetch('http://localhost:5000/api/facture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      // Une fois la facture ajoutée avec succès, vous pouvez rafraîchir la liste des factures pour afficher la nouvelle facture
      console.log('Facture ajoutée avec succès:', data);
      // Rafraîchir la liste des factures en rechargeant la page (ou en utilisant un autre moyen pour mettre à jour les données)
      window.location.reload();
    })
    .catch(error => console.error('Erreur lors de l\'ajout de la facture:', error));
  };*/
  // Créez une fonction pour vérifier si le numéro de facture existe déjà pour le prestataire/fournisseur sélectionné
const isFactureNUnique = (factureN, prestataire) => {
  // Filtrer la liste des factures pour trouver celles qui ont le même numéro de facture
  const facturesAvecMemeFactureN = factures.filter(
    (facture) =>
      facture.factureN === factureN &&
      facture.Prestataire_fournisseur === prestataire
  );

  // Si aucune facture avec le même numéro de facture n'est trouvée, le numéro de facture est unique
  return facturesAvecMemeFactureN.length === 0;
};
const [error, setError] = useState(null);
const handleAdd = () => {
  // Vérifiez d'abord si le numéro de facture est unique pour le prestataire sélectionné
  const isUnique = isFactureNUnique(formData.factureN, formData.Prestataire_fournisseur);

  if (isUnique) {
    // Si le numéro de facture est unique, vous pouvez ajouter la facture
    fetch('http://localhost:5000/api/facture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      // Une fois la facture ajoutée avec succès, vous pouvez rafraîchir la liste des factures pour afficher la nouvelle facture
      console.log('Facture ajoutée avec succès:', data);
      // Rafraîchir la liste des factures en rechargeant la page (ou en utilisant un autre moyen pour mettre à jour les données)
      window.location.reload();
    })
    .catch(error => console.error('Erreur lors de l\'ajout de la facture:', error));
  } else {
    // Si le numéro de facture n'est pas unique, mettez à jour l'état d'erreur
    setError('Le numéro de facture existe déjà pour ce prestataire/fournisseur.');
  }
};
  

  /*const [showEditModal, setShowEditModal] = useState(false);
  const [editFacture, setEditFacture] = useState(null);

  // Fonction pour afficher le modal de modification lorsque l'utilisateur clique sur le bouton "Modifier"
  const handleEditClick = (facture) => { setEditFacture(facture);  setShowEditModal(true) };
  // Fonction pour gérer la mise à jour de la facture après la modification dans le modal
  const handleUpdateFacture = (updatedFacture) => {
    // Faites ici la mise à jour de la facture en utilisant la fonction handleEdit que vous avez importée de edit_fac.js
    handleEdit(updatedFacture); setShowEditModal(false); };*/

  const handleDeleteClick = (factureId) => { handleDelete(factureId);};
 
  const [showModalpdf, setpdfShowModal] = useState(false);
  const [startNum, setStartNum] = useState('');
  const [endNum, setEndNum] = useState('');
  const generatePDF = (factures) => {
    const doc = new jsPDF();
    doc.text('Factures Exportées', 10, 10);

    factures.forEach((facture, index) => {
      const yPosition = 20 + index * 10;
      doc.text(
        `${generateInvoiceNumber(facture.N)} - ${
          facture.Prestataire_fournisseur
        } - Montant: ${facture.montant}`,
        10,
        yPosition
      );
    });

    doc.save('factures.pdf');
  };

  const handleSendPDF = (startNumber, endNumber) => {
    const selectedFactures = factures.filter((facture) => {
      const factureNumber = parseInt(facture.N);
      const start = parseInt(startNumber);
      const end = parseInt(endNumber);
      return factureNumber >= start && factureNumber <= end;
    });

    generatePDF(selectedFactures);

    // Call sendPDFByEmail here if you've implemented it

    setpdfShowModal(false);
  };

  const componentRef = useRef();
  const [selectedService, setSelectedService] = useState('Finance');
  const [showimpModal, setShowimpModal] = useState(false);
  const handlePrintimp = useReactToPrint({
    content: () => componentRef.current, // Specify the component to be printed
  });

  const handleServiceChange = (selectedOption) => {
    setSelectedService(selectedOption.value);
  };

  const [startNume, setStartNume] = useState('');
  const [endNume, setEndNume] = useState('');

  

  const [prestataires, setPrestataires] = useState([]);

  useEffect(() => {
  fetchPrestataires();
  }, []);
  
  const fetchPrestataires = async () => {
  try {
  const response = await axios.get('http://localhost:5000/api/prestataires');
  setPrestataires(response.data.map(prestataire => ({
  value: prestataire.Nom_pres,
  label: prestataire.Nom_pres,
  })
  )) ;
  } catch (error) {
  console.error('Erreur lors de la récupération des prestataires:', error);
  }
  };
  
  const MyComponent = () => (
  <Select options={prestataires}
  value={prestataires.find(option => option.value === formData.Prestataire_fournisseur)}
  onChange={(selectedOption) => setFormData({ ...formData, Prestataire_fournisseur: selectedOption.value })}
  />
  );

  return (
    <div className="App">
      <br/><br/>
      <div className="mx-auto" style={{ maxWidth: "95%" }}>
      <Button onClick={handleShowModal}><FontAwesomeIcon icon={faPlus} /> Ajouter</Button> <Button onClick={handleExportToExcelClick}><FontAwesomeIcon icon={faFileExcel} /> Exporter vers Excel</Button> <Button onClick={() => setpdfShowModal(true)}><FontAwesomeIcon icon={faFilePdf} /> Exporter vers PDF</Button>  <Button onClick={() => setShowimpModal(true)}><FontAwesomeIcon icon={faPrint} /> Imprimer</Button>
      <Form.Control placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="custom-search-input"/>
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
          <Modal.Title>Nouvelle Facture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
             <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>N°</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="N°"
                  value={formData.N}
                  onChange={(e) => setFormData({ ...formData, N: e.target.value })}
                  autoFocus
                  required
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Prestataire/Fournisseur</Form.Label>
                <MyComponent />
              </Form.Group>
              
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label>Facture N°</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Facture N°"
                  value={formData.factureN}
                  onChange={(e) => setFormData({ ...formData, factureN: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput3">
                <Form.Label>Date Facture</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.Datefacture}
                  onChange={(e) => setFormData({ ...formData, Datefacture: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput4">
                <Form.Label>Montant</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Montant"
                  value={formData.montant}
                  onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput4">
                <Form.Label>Bon de Commande ou Contrat N°</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bon de Commande ou Contrat N°"
                  value={formData.bonCommande}
                  onChange={(e) => setFormData({ ...formData, bonCommande: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput4">
                <Form.Label>Imputation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Imputation"
                  value={formData.imputation}
                  onChange={(e) => setFormData({ ...formData, imputation: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput4">
                <Form.Label>Observations</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Observations"
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                />
              </Form.Group>
          </Form>
          <br/>
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Fermer</Button>
          <Button variant="primary" onClick={handleAdd}>Ajouter</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalpdf} onHide={() => setpdfShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Générer un PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="startNum">
            <Form.Label>Numéro de début</Form.Label>
            <Form.Control
              type="number"
              value={startNum}
              onChange={(e) => setStartNum(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="endNum">
            <Form.Label>Numéro de fin</Form.Label>
            <Form.Control
              type="number"
              value={endNum}
              onChange={(e) => setEndNum(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setpdfShowModal(false)}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSendPDF(startNum, endNum)}
          > Générer le PDF </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showimpModal} onHide={() => setShowimpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Impression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="startNum">
          <Form.Label>Numéro de début</Form.Label>
          <Form.Control
            type="number"
            value={startNume}
            onChange={(e) => setStartNume(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="endNum">
          <Form.Label>Numéro de fin</Form.Label>
          <Form.Control
            type="number"
            value={endNume}
            onChange={(e) => setEndNume(e.target.value)}
          />
  </Form.Group>
      <Form.Group controlId="selectedService">
        <Form.Label>Sélectionnez le service</Form.Label>
        <Select
          options={[
            { value: 'Finance', label: 'Finance' },
            { value: 'Liaison', label: 'Liaison' },
          ]}
          value={{ value: selectedService, label: selectedService }}
          onChange={handleServiceChange}
        />
      </Form.Group>
      <div className="print-content" ref={componentRef}>
      <style>
        {`
          @media print {
            .print-content {
              display: block;
            }
          }
        `}
      </style>
  <div className="print-header" >
    <div className="column">
      <img className="logo" src="logosonatrach.png" alt="Sonatrach Logo" /> 
      <h4 className="envoi">Bordereau d'envoi</h4><br/>
      <div className="sender">    Expéditeur </div><br/>
      <div className="sender2">Service Ordonnancement </div> <div className={`recipient ${selectedService === 'Finance' ? 'finance' : 'Liaison'}`}>Destinataire:<strong>
              {selectedService === 'Finance'
                ? ' Monsieur le chef département comptabilité générale'
                : ' Monsieur le chef département liaisons'}
      </strong></div><br/>
      <div className="sender3">      DGP</div>  <div className="user">Fait par : <strong>Mme. </strong></div>
    </div>
  </div>
  <div className="div-table">
  <Table >
    <thead>
    <tr>
            <th>N°</th>
            <th>Prestataire/Fournisseur</th>
            <th>Facture N°</th>
            <th>Date Facture</th>
            <th>Montant</th>
            <th>Bon de Commande ou Contrat N°</th>
          </tr>
    </thead>
    <tbody>
        {searchResults
      .filter(facture => facture.N >= startNume && facture.N <= endNume)
      .map((facture) => (
        <tr key={facture._id}>
          <td>{generateInvoiceNumber(facture.N)}</td>
          <td>{facture.Prestataire_fournisseur}</td>
          <td>{facture.factureN}</td>
          <td>{facture.Datefacture}</td>
          <td>{facture.montant}</td>
          <td>{facture.bonCommande}</td>
        </tr>
      ))}
  </tbody>
  </Table>
  </div>
      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowimpModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handlePrintimp}>
            Imprimer
          </Button>
        </Modal.Footer>
      </Modal>
      <br/><br/>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(facture => (
            <tr key={facture._id}>
               <td>{generateInvoiceNumber(facture.N)}</td>
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
              <td> 
                
                <button onClick={() => handleDeleteClick(facture._id)} className="btn btn-danger">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br/><br/>
      </div>
    </div>
  );
}

export default TablePage;

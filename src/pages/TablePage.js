import React, { useState, useEffect, useRef } from 'react';
import { Modal, Table, Button, Form } from 'react-bootstrap';
import handleExportToExcel from './excel';
import Select from 'react-select';
import imprimer from './imprimer';
import Navbar from './Navbar';
import jwtDecode from 'jwt-decode';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash, faFilePdf, faPrint, faFileExcel, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../style/style.css';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
//import EditModal, { handleEdit } from './edit_fac'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print'; 
import axios from 'axios';

function TablePage() {
  const [userId, setUserId] = useState( "");
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
 // const [showSearchBar, setShowSearchBar] = useState(false);
  const [factures, setFactures] = useState([]);
  const [showImage, setShowImage] = useState(false);
 // const [imageSrc, setImageSrc] = useState('');
 const [messageErreur, setMessageErreur] = useState('');

  const [facture, setFacture] = useState({
    _id:'',
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
    fichier: { name: '' },
    dateVirement: '',
    arrivee: '',

  });

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
    userId:'',

  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  
  /*const afficherImage = (event) => {

  const afficherImage = (event) => {

    event.preventDefault();
    const imageSrc = event.target.src;
    setImageSrc(imageSrc);
    setShowImage(true);
<<<<<<< HEADf
  };*/

  

  const fermerImage = () => {
    setShowImage(false);
  };

 // Edir
  const handleShowModalEdit = (facture) => {
    setFacture({
      _id:facture._id,
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
    setShowModalEdit(true);
  };
  function generateInvoiceNumber(num) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const invoiceNumber = String(num).padStart(3, '0') + '-' + String(month) + '/' + String(year);
    return invoiceNumber;
  }
  useEffect(() => {
    // Fetch initial factures when the component mounts
    fetchFactures();
  }, []); // Empty dependency array to run this effect only once


  const fetchFactures = () => {
    fetch('http://localhost:5000/api/facture')
      .then(response => response.json())
      .then(data => setFactures(data))
      .catch(error => console.error('Error fetching factures:', error));
  };

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
  
  const handleShowModal = () => { setShowModal(true);
 };

  const handleCloseModal = () => { setShowModal(false);
    setFormData({
      N: '',
      factureN: '',
      Datefacture: '',
      montant: '',
      bonCommande: '',
      imputation: '',
      observations: '',
      Prestataire_fournisseur: '',
    });};

  const handleCloseModalEdit = () => { setShowModalEdit(false);};

  const handleFileChange = async (e) => {
    console.log("apl change file ")
    const selectedFile = e.target.files[0];
   
    setFacture({ ...facture, fichier: selectedFile });
  
    // Upload the file to the server and get the image URL
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
  
    // Handle the response
    if (response.ok) {
      const data = await response.json();
      // Mettez à jour l'état de facture.fichier avec l'URL reçue
      setFacture({ ...facture, fichier: data.imageUrl });
    } else {
      // Gérer les erreurs en cas de problème avec le téléchargement
      console.error('Erreur lors du téléchargement du fichier');
    }
  };
  
 /* const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFacture({ ...facture, fichier: e.target.value });
  };*/
  const handleDelete = (factureId)=> {
    fetch(`http://localhost:5000/api/facture/${factureId}`, {
              method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
              // Supprimer la facture de l'affichage dans la liste des factures
              console.log('Facture supprimée:', data);
              // Rafraîchir la liste des factures en rechargeant la page (ou en utilisant un autre moyen pour mettre à jour les données)
              fetchFactures();
            })
            .catch(error => console.error('Erreur lors de la suppression de la facture:', error));
  };
  const handleEdit = () => {
    fetch(`http://localhost:5000/api/facture/${facture._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(facture),
    })
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour l'affichage de la facture mise à jour dans la liste des factures
        console.log('Facture mise à jour:', data);
        // Mettez à jour l'état de la facture avec les nouvelles données si nécessaire
        // setFacture(data); // Si le serveur renvoie les données mises à jour
        // Fermez le modèle de modification après la mise à jour réussie
        fetchFactures();
        handleCloseModalEdit()
      })
      .catch((error) =>
        console.error('Erreur lors de la mise à jour de la facture:', error)
      );
  };


  /*const handleAdd = () => {

  const handleAdd = () => {
    formData.userId=userId
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
    formData.userId=userId
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
      fetchFactures(); 
   handleCloseModal()  })
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
    console.log("iDDDDDDDdd",userId);

    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);

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
    
  const handleDeleteClick = (factureId) => { handleDelete(factureId);};

  const [showpdfModal, setShowpdfModal] = useState(false);
  const [startNum, setStartNum] = useState('');
  const [endNum, setEndNum] = useState('');

  const handleSendEmail = () => {
    // Générer le PDF avec les numéros de début et de fin
    const selectedFactures = factures.filter((facture) => {
      const factureNumber = parseInt(facture.N);
      const start = parseInt(startNum);
      const end = parseInt(endNum);
      return factureNumber >= start && factureNumber <= end;
    });
    generatePDF(selectedFactures);
    console.log('PDF généré et téléchargé avec succès !');
    // Pré-remplir les détails de l'e-mail
    const subject = 'Factures';
    const body = 'Veuillez trouver les factures ci-jointes.';
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Ouvrir la fenêtre de composition de courrier Outlook
    window.location.href = mailtoLink;

    // Fermer le modal après avoir effectué l'action
    setShowpdfModal(false);
  };

  
    const generatePDF = () => {
      const doc = new jsPDF();
      const headStyles = {
        fillStyle: 'striped',
        fontStyle: 'bold',
        textColor: [0, 0, 0], // Police en gras pour l'en-tête
        fillColor: [256, 256, 256], // Couleur de fond de l'en-tête (gris)
      };
    
      // Définir les styles de ligne
      const rowStyles = {
        drawRow(row, data) {
          // Ajouter des lignes de grille après chaque ligne de données
          doc.setDrawColor(0); // Couleur de la ligne (noir)
          doc.setLineWidth(0.5); // Épaisseur de la ligne
          doc.line(10, row.y + row.height, 200, row.y + row.height); // Dessiner la ligne
        },
      };
      const imgData = 'logosonatrach.png';
      doc.addImage(imgData, 'PNG', 20, 5, 25, 35); 
      doc.setFontSize(16); 
      doc.setFont('helvetica', 'bold');
      doc.text('Bordereau d\'envoi', 100, 25);
      doc.setFont('helvetica', 'normal');
// Revenez à la taille de police par défaut
    doc.setFontSize(13);
    // Informations d'expéditeur
    doc.text('Expéditeur', 22, 47);
    doc.text('Service Ordonnancement', 8, 53);
    
    // Informations de destinataire
    doc.text('Destinataire:', 90, 53);
    doc.setFont('helvetica', 'bold'); // Définir le style de police en gras
    doc.text(' Monsieur le chef département liaisons', 115, 53);
    doc.setFont('helvetica', 'normal'); 
    // Autres informations
   doc.text('DGP', 26, 59);
    doc.text('Fait par:', 140, 59);
    doc.setFont('helvetica', 'bold'); // Revenez au style de police normal
    doc.text(`Mme. ${currentUser?.lastName}`, 160, 59);

    
    doc.setFont('helvetica', 'normal');
    // Tableau
    doc.autoTable({
      startX:2,
      startY: 80, // Position verticale de départ du tableau
      head: [
        ['N°', 'Prestataire/Fournisseur', 'Facture N°', 'Date Facture', 'Montant', 'Bon de Commande ou Contrat N°'],
      ],
      body: factures
        .filter(facture => facture.N >= startNum && facture.N <= endNum  && facture.userId === userId)
        .map(facture => [
          generateInvoiceNumber(facture.N),
          facture.Prestataire_fournisseur,
          facture.factureN,
          facture.Datefacture,
          facture.montant,
          facture.bonCommande,
        ]), 
        styles: {
          fontSize: 13,
          fontStyle: 'normal',
          textColor: [0, 0, 0],
          fillStyle: 'striped', // Style de remplissage des cellules (striped)
        },
        headStyles: headStyles,
        rowStyles: rowStyles,
        
      });
      

    const currentDate = new Date();
  const fileName = `factures_${currentDate.getTime()}.pdf`;

  // Téléchargez le PDF avec le nom de fichier personnalisé
  doc.save(fileName);
    
  };
  

 /*
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
  };*/
  const [checked, setChecked] = useState(false); 
  const [factureSelectionne, setFactureSelectionne] = useState({
    _id:'',
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
  const [checkboxState, setCheckboxState] = useState([]);
 // const [factureSelectionne, setFactureSelectionne] = useState(false);
  const handleChange = (facture, index) => {
    const updatedState = [...checkboxState];
    updatedState[index] = !updatedState[index];
    setCheckboxState(updatedState);
    setChecked(!checked);
    setFactureSelectionne(facture)
    console.log("facture selectionne ",facture)
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
  const fetchPrestataires = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/prestataires');
      setPrestataires(
        response.data
          .filter((prestataire) => prestataire.userid === userId)
          .map((prestataire) => ({
            value: prestataire.Nom_pres,
            label: prestataire.Nom_pres,
          }))
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des prestataires:', error);
    }
  };

  fetchPrestataires();
}, [userId]); 
  
  const MyComponent = () => (
    <Select
      options={prestataires}
      value={prestataires.find((option) => option.value === formData.Prestataire_fournisseur)}
      onChange={(selectedOption) => setFormData({ ...formData, Prestataire_fournisseur: selectedOption.value })}
    />
  );
  

  return (
    <div className="App">
      <Navbar />
      <br/><br/>
      <div className="mx-auto" style={{ maxWidth: "95%" }}>
      <Button onClick={handleShowModal}><FontAwesomeIcon icon={faPlus} /> Ajouter</Button> <Button onClick={handleExportToExcelClick}><FontAwesomeIcon icon={faFileExcel} /> Exporter vers Excel</Button> 

      <Button onClick={() => imprimer(factureSelectionne,messageErreur)}  variant="primary">Fiche Bon A Payer</Button>
       <Button variant="primary" onClick={() => setShowpdfModal(true)}><FontAwesomeIcon icon={faFilePdf} />Envoyer par Outlook</Button>  <Button onClick={() => setShowimpModal(true)}><FontAwesomeIcon icon={faPrint} /> Imprimer</Button>
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
      <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
      <Modal.Header closeButton>
          <Modal.Title>modifier la Facture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>N°</Form.Label>
        <Form.Control
          type="text"
          placeholder="N°"
          value={facture.N}
          onChange={(e) => setFacture({ ...facture, N: e.target.value })}
          autoFocus
          required
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Prestataire/Fournisseur</Form.Label>
               
                <Select
    
   value={prestataires.find((option) => option.value === facture.Prestataire_fournisseur)}
   onChange={(selectedOption) => setFacture({ ...facture, Prestataire_fournisseur: selectedOption.value })}
    autoFocus
    required
    options={prestataires}
  />
              </Form.Group>
  
<Form.Group controlId="exampleForm.ControlInput2">
        <Form.Label>Facture N°</Form.Label>
        <Form.Control
          type="text"
          placeholder="Facture N°"
          value={facture.factureN}
          onChange={(e) => setFacture({ ...facture, factureN: e.target.value })}
        />
      </Form.Group>

      {/* Champ : Date Facture */}
      <Form.Group controlId="exampleForm.ControlInput3">
        <Form.Label>Date Facture</Form.Label>
        <Form.Control
          type="date"
          value={facture.Datefacture}
          onChange={(e) => setFacture({ ...facture, Datefacture: e.target.value })}
        />
      </Form.Group>

      {/* Champ : Montant */}
      <Form.Group controlId="exampleForm.ControlInput4">
        <Form.Label>Montant</Form.Label>
        <Form.Control
          type="text"
          placeholder="Montant"
          value={facture.montant}
          onChange={(e) => setFacture({ ...facture, montant: e.target.value })}
        />
      </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput4">
                <Form.Label>Bon de Commande ou Contrat N°</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bon de Commande ou Contrat N°"
                  value={facture.bonCommande}
                  onChange={(e) => setFacture({ ...facture, bonCommande: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput3">
        <Form.Label>Date de transmission à DPT</Form.Label>
        <Form.Control
          type="date"
          value={facture.transmisDPT}
          onChange={(e) => setFacture({ ...facture, transmisDPT: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput3">
        <Form.Label>Date de transmission à DFC</Form.Label>
        <Form.Control
          type="date"
          value={facture.transmisDFC}
          onChange={(e) => setFacture({ ...facture, transmisDFC: e.target.value })}
        />
      </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput4">
                <Form.Label>Imputation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Imputation"
                  value={facture.imputation}
                  onChange={(e) => setFacture({ ...facture, imputation: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput4">
                <Form.Label>Observations</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Observations"
                  value={facture.observations}
                  onChange={(e) => setFacture({ ...facture, observations: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput5">
        <Form.Label>Fichier</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          value={facture.fichier.name}
        />
      </Form.Group>
     

      <Form.Group controlId="exampleForm.ControlInput4">
                <Form.Label>Date et N de virement </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Date et N° de virement"
                  value={facture.dateVirement}
                  onChange={(e) => setFacture({ ...facture, dateVirement: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput3">
        <Form.Label> arrivée le  </Form.Label>
        <Form.Control
          type="date"
          placeholder="Arrivée le"
          value={facture.arrivee}
          onChange={(e) => setFacture({ ...facture, arrivee: e.target.value })}
        />
      </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalEdit}>Fermer</Button>
          <Button variant="primary" onClick={handleEdit}>confirmer</Button>
        </Modal.Footer>
      </Modal> 
   
      {/*<Modal show={showModalpdf} onHide={() => setpdfShowModal(false)}>
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
          </Modal>*/}
          <Modal show={showpdfModal} onHide={() => setShowpdfModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Générer et envoyer un PDF</Modal.Title>
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
          <Button variant="secondary" onClick={() => setShowpdfModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSendEmail}>
            Envoyer par Outlook
          </Button>
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
      <div className="sender3">      DGP</div>  <div className="user">Fait par : <strong>Mme. {currentUser?.lastName}</strong></div>
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
      .filter(facture => facture.N >= startNume && facture.N <= endNume && facture.userId === userId)
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
     
      <Table striped bordered hover style={{ width: '100%', margin: '0 auto' }}>
  <thead>
    <tr>
      <th></th>
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
    {searchResults
    .filter((facture) => {
      const factureYear = new Date(facture.Datefacture).getFullYear();
      const currentYear = new Date().getFullYear();
      return facture.userId === userId && factureYear === currentYear;    })
    .map((facture, index) => (
      <tr key={facture._id}>
        <td>
          <input
            type="radio"
            checked={checkboxState[index] || false}
            onChange={() => handleChange(facture, index)}
          />
        </td>
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
        <td><a href={`http://localhost:5000${facture.fichier}`}>voir l'image</a></td>
        <td>{facture.dateVirement}</td>
        <td>{facture.arrivee}</td>
        <td>
          <button onClick={() => handleDeleteClick(facture._id)} className="btn btn-danger">
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <Button onClick={() => handleShowModalEdit(facture)} className="btn btn-warning">
            <FontAwesomeIcon icon={faPencilAlt} />
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

      {showImage && (
        <div className="image-overlay" onClick={fermerImage}>

          <img alt="Facture Affichée" />

        </div>
      )}
      <br/><br/>
      </div>
    </div>
  );
}

export default TablePage;

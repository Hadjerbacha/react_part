

import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';
import Navbar from './Navbar';

function Prestataire() {
  const [userid, setUserId] = useState("");
  const [prestataires, setPrestataires] = useState([]);
  const [formDataPrestataire, setFormDataPrestataire] = useState({
    Nom_pres: '',
    Region_pres: '',
    userid: '',
    lieux:''
  });
  formDataPrestataire.selectedUserId = formDataPrestataire.userid;
  
  const [showModal, setShowModal] = useState(false);
  const [selectedPrestataire, setSelectedPrestataire] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fonction à exécuter au chargement de la page
    (function () {
    })();
    fetchPrestataires();
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

  const fetchPrestataires = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/prestataires');
      setPrestataires(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des prestataires:', error);
    }
  };

  const handleAddPrestataire = async () => {
    try {
      const prestataireData = {
        ...formDataPrestataire,
        userid: userid, 
      };
      console.log("user with userId",formDataPrestataire)

      const response = await axios.post('http://localhost:5000/api/prestataire', prestataireData);
      console.log('Prestataire ajouté avec succès:', response.data);
      fetchPrestataires(); // Rafraîchir la liste des prestataires
      setFormDataPrestataire({ Nom_pres: '', Region_pres: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Erreur lors de l\'ajout de prestataire:', error);
    }
  };

  const handleEditPrestataire = (prestataire) => {
    setSelectedPrestataire(prestataire);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/prestataire/${selectedPrestataire._id}`, selectedPrestataire);
      console.log('Prestataire modifié avec succès:', response.data);
      fetchPrestataires(); // Rafraîchir la liste des prestataires
      setShowModal(false);
      setSelectedPrestataire(null);
    } catch (error) {
      console.error('Erreur lors de la modification de prestataire:', error);
    }
  };

  const handleDeletePrestataire = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/prestataire/${id}`);
      console.log('Prestataire supprimé avec succès:', response.data);
      fetchPrestataires(); // Rafraîchir la liste des prestataires
    } catch (error) {
      console.error('Erreur lors de la suppression de prestataire:', error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <br /><br />
      <div className="mx-auto" style={{ maxWidth: "95%" }}>
        <div className="d-flex align-items-center">
          <Form.Group controlId="Nom_pres" className="me-3">
            <Form.Control
              type="text"
              placeholder="Nom du prestataire"
              value={formDataPrestataire.Nom_pres}
              onChange={(e) => setFormDataPrestataire({ ...formDataPrestataire, Nom_pres: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="Region_pres" className="me-3">
            <Form.Control
              type="text"
              placeholder="Région du prestataire"
              value={formDataPrestataire.Region_pres}
              onChange={(e) => setFormDataPrestataire({ ...formDataPrestataire, Region_pres: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="lieux" className="me-3">
            <Form.Control
              type="text"
              placeholder="est ouest sud nord"
              value={formDataPrestataire.lieux}
              onChange={(e) => setFormDataPrestataire({ ...formDataPrestataire, lieux: e.target.value })}
            />
          </Form.Group>
          <Button onClick={handleAddPrestataire}><FaPlus /> Ajouter Prestataire</Button>
          <div style={{ marginLeft: '250px' }}></div> {/* Espace */}
          <Form.Group controlId="searchTerm" className="custom-search-input">
            <Form.Control
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </div> <br />
        <Table striped bordered hover style={{ margin: '0 auto' }}>
          <thead>
            <tr>
              <th>Nom du prestataire/fournisseur</th>
              <th>Région du prestataire/fournisseur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prestataires
              .filter(prestataire => prestataire.userid === userid)
              .filter(prestataire => {
                const searchRegex = new RegExp(searchTerm, 'i'); // 'i' pour une recherche insensible à la casse
                return searchRegex.test(prestataire.Nom_pres) || searchRegex.test(prestataire.Region_pres);
              })
              .map(prestataire => (
                <tr key={prestataire._id}>
                  <td>{prestataire.Nom_pres}</td>
                  <td>{prestataire.Region_pres}</td>
                  <td style={{ margin: '0 auto' }}>
                    <Button variant="light" onClick={() => handleEditPrestataire(prestataire)} style={{ color: 'bleu' }}><FaEdit /> modifier</Button>{' '}
                    <Button variant="light" onClick={() => handleDeletePrestataire(prestataire._id)} style={{ color: 'red' }}><FaTrash /> supprimer</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <br />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Prestataire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="Nom_pres">
            <Form.Label>Nom du prestataire</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom du prestataire"
              value={selectedPrestataire?.Nom_pres || ''}
              onChange={(e) => setSelectedPrestataire({ ...selectedPrestataire, Nom_pres: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="Region_pres">
            <Form.Label>Région du prestataire</Form.Label>
            <Form.Control
              type="text"
              placeholder="Région du prestataire"
              value={selectedPrestataire?.Region_pres || ''}
              onChange={(e) => setSelectedPrestataire({ ...selectedPrestataire, Region_pres: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Prestataire;

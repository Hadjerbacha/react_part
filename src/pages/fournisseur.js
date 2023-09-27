import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';
import Navbar from './Navbar';

function Fournisseur() {
  const [userid, setUserId] = useState("");
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [prestataires, setPrestataires] = useState([]);
  const [formDataPrestataire, setFormDataPrestataire] = useState({
    Nom_pres: '',
    Region_pres: '',
    selectedUserId: '', // ID de l'utilisateur sélectionné
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedPrestataire, setSelectedPrestataire] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers(); // Récupérer la liste des utilisateurs
    fetchPrestataires();
    // Récupérer le jeton JWT depuis le stockage local
    const token = localStorage.getItem('token');

    if (token) {
      // Déchiffrer le jeton JWT pour obtenir les informations de l'utilisateur
      const decodedUser = jwtDecode(token);

      // Mettre à jour l'état avec les informations de l'utilisateur décodé
      setUserId(decodedUser.userId);
      
    }
  }, []);


  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data); // Stocker la liste des utilisateurs
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };
  

  const fetchPrestataires = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/prestataires');
      setPrestataires(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des prestataires:', error);
    }
  };

  const [selectedUserName, setSelectedUserName] = useState("");
  const handleAddPrestataire = async () => {
    try {
      const selectedUser = users.find(user => user._id === formDataPrestataire.selectedUserId);
      const prestataireData = {
        ...formDataPrestataire,
        userid: formDataPrestataire.selectedUserId,
      };

      const response = await axios.post('http://localhost:5000/api/prestataire', prestataireData);
      console.log('Prestataire ajouté avec succès:', response.data);
      fetchPrestataires();
      setFormDataPrestataire({ Nom_pres: '', Region_pres: '', selectedUserId: '' });

      // Mettez à jour le nom de l'utilisateur sélectionné
      setSelectedUserName(`${selectedUser.firstName} ${selectedUser.lastName}`);
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
  console.log(userid);
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
          {/* Ajouter un champ de sélection d'utilisateur */}
          <Dropdown className="me-3">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {formDataPrestataire.selectedUserId ? 'Utilisateur sélectionné' : 'Sélectionner un utilisateur'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {users
              .filter(user => user.role !== 'admin')
              .map(user => (
                <Dropdown.Item
                  key={user._id}
                  onClick={() => setFormDataPrestataire({ ...formDataPrestataire, selectedUserId: user._id })}
                >
                  {user.firstName} {user.lastName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          
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
          <Button onClick={handleAddPrestataire}><FaPlus /> Ajouter Prestataire</Button>
           <div style={{ marginLeft: '35px' }}></div> {/*Espace */}
          <Form.Group controlId="searchTerm" className="custom-search-input">
            <Form.Control
              type="text" 
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </div> <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom du prestataire/fournisseur</th>
              <th>Région du prestataire/fournisseur</th>
              <th>Nom de l'utilisateur</th> {/* Colonne du nom de l'utilisateur */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
    {prestataires
      .filter(prestataire => {
        const searchRegex = new RegExp(searchTerm, 'i');
        return searchRegex.test(prestataire.Nom_pres) || searchRegex.test(prestataire.Region_pres);
      })
      .map(prestataire => (
        <tr key={prestataire._id}>
          <td>{prestataire.Nom_pres}</td>
          <td>{prestataire.Region_pres}</td>
          <td>{selectedUserName}</td> {/* Afficher le nom de l'utilisateur sélectionné */}
          <td>
            <Button variant="success" onClick={() => handleEditPrestataire(prestataire)}><FaEdit /></Button>{' '}
            <Button variant="danger" onClick={() => handleDeletePrestataire(prestataire._id)}><FaTrash /></Button>
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
          <Form.Group controlId="selectedUser">
  <Form.Label>Utilisateur</Form.Label>
  <Form.Control
    as="select"
    value={selectedPrestataire?.userid || ''}
    onChange={(e) => setSelectedPrestataire({ ...selectedPrestataire, userid: e.target.value })}
  >
    {users
      .filter(user => user.role !== 'admin')
      .map(user => (
        <option key={user._id} value={user._id}>
          {user.firstName} {user.lastName}
        </option>
      ))}
  </Form.Control>
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

export default Fournisseur;

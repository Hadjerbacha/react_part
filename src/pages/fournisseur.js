import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Fournisseur() {
  const [prestataires, setPrestataires] = useState([]);
  const [formDataPrestataire, setFormDataPrestataire] = useState({
    Nom_pres: '',
    Region_pres: '',
  });

  useEffect(() => {
    fetchPrestataires();
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
      const response = await axios.post('http://localhost:5000/api/prestataire', formDataPrestataire);
      console.log('Prestataire ajouté avec succès:', response.data);
      fetchPrestataires(); // Rafraîchir la liste des prestataires
    } catch (error) {
      console.error('Erreur lors de l\'ajout de prestataire:', error);
    }
  };

  return (
    <div className="App">
      <br/><br/>
      <div className="mx-auto" style={{ maxWidth: "95%" }}>
        {/* Formulaire pour ajouter un prestataire */}
        <Form.Group controlId="Nom_pres">
          <Form.Label>Nom du prestataire</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom du prestataire"
            value={formDataPrestataire.Nom_pres}
            onChange={(e) => setFormDataPrestataire({ ...formDataPrestataire, Nom_pres: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="Region_pres">
          <Form.Label>Région du prestataire</Form.Label>
          <Form.Control
            type="text"
            placeholder="Région du prestataire"
            value={formDataPrestataire.Region_pres}
            onChange={(e) => setFormDataPrestataire({ ...formDataPrestataire, Region_pres: e.target.value })}
          />
        </Form.Group>
        <Button onClick={handleAddPrestataire}>Ajouter Prestataire</Button>
        <br/>
        {/* Tableau des prestataires */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom du prestataire</th>
              <th>Région du prestataire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prestataires.map(prestataire => (
              <tr key={prestataire._id}>
                <td>{prestataire.Nom_pres}</td>
                <td>{prestataire.Region_pres}</td>
                <td>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br/>
      </div>
    </div>
  );
}

export default Fournisseur;

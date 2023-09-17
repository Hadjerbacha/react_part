// edit_fac.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';

export const handleEdit = (facture) => {

  fetch(`http://localhost:5000/api/facture/${facture._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(facture),
  })
  .then(response => response.json())
  .then(data => {
    // Mettre à jour l'affichage de la facture mise à jour dans la liste des factures
    console.log('Facture mise à jour:', data);
  })
  .catch(error => console.error('Erreur lors de la mise à jour de la facture:', error));
};

  export default function EditModal({ facture}) {
    function EditModal({ facture, onUpdate }) {
      const [formData, setFormData] = useState({
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
  
/*
  const handleUpdate = () => {
    // Ici, vous pouvez ajouter la logique pour effectuer la mise à jour de la facture
    // en utilisant les données de formData et la fonction onUpdate passée depuis le composant parent
    onUpdate(formData);
  };
*/
  const options = [
    { value: 'Ensp', label: 'Ensp' },
    { value: 'Enageo', label: 'Enageo' },
    { value: 'Houna el firdaous', label: 'Houna el firdaous' },
    { value: 'Le Majestic', label: 'Le Majestic' },
    { value: 'El Mountazah', label: 'El Mountazah' },
    { value: 'Four Points', label: 'Four Points' },
    { value: 'Soltane', label: 'Soltane' },
    { value: 'el Kenz', label: 'el Kenz' },
    { value: 'Oran center', label: 'Oran center' },
    { value: 'Mraguen', label: 'Mraguen' },
    { value: 'Le Zephyr', label: 'Le Zephyr' },
    { value: 'Mina', label: 'Mina' },
    { value: 'Ben Osmane', label: 'Ben Osmane' },
    { value: 'Beau rivage zelfana', label: 'Beau rivage zelfana' }
  ];
  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleShowModalEdit = (facture) => { setShowModalEdit(true); };
  const handleCloseModalEdit = () => { setShowModalEdit(false);};
  const MyComponent = () => (
    <Select options={options} 
    value={options.find(option => option.value === formData.Prestataire_fournisseur)}
  onChange={(selectedOption) => setFormData({ ...formData, Prestataire_fournisseur: selectedOption.value })}
/>
  );
  
  const handleUpdate = () => {
    onUpdate(formData);
    setShowModalEdit(false);
  };

  return /*(

   
    <Modal show={true} onHide={() => {}}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier la facture</Modal.Title>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {}}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Enregistrer les modifications
        </Button>
      </Modal.Footer>
    </Modal>
  );*/
}}
import { Modal, Table, Button, Form } from 'react-bootstrap';
<<<<<<< HEAD
import React, { useState, useEffect  } from 'react';
import axios from "axios";
import Header from "./header";
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
=======
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Header from "./header";
import {  faTrash, faFilePdf, faPrint, faFileExcel, faPlus } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 92b828e987a40dbb05043b2c39983b19d06473ef
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 // Assurez-vous d'importer le fichier de styles approprié

const AddUser = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/users')
          .then(response => response.json())
          .then(data => {
            setUsers(data);
          })
         
          .catch(error => console.error('Error fetching factures:', error));
      }, []);

      const [error, setError] = useState("");
      const initialState = {
        lastName: '',
        firstName: '',
        email: '',
        password: '',
      };
      const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
      const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
    const handleCloseModal = () => { setShowModal(false);
        setData(initialState);};
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
    
        setShowModal(true);
      };
      const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/users";
			const { data: res } = await axios.post(url, data);
			console.log(res.message);
            setData(initialState);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}};

        const [user, setUser] = useState({
            _id:'',
            lastName: '',
            firstName: '',
            email: '',
            password: '',
          });
          const [showModalEdit, setShowModalEdit] = useState(false);
          const handleCloseModalEdit = () => { setShowModalEdit(false);};
          const handleShowModalEdit = (user) => {
            setUser({
              _id:user._id,
              lastName:user.lastName,
            firstName: user.firstName,
            email: user.email,
            password: user.password,
            });
            setShowModalEdit(true);
          };
          const handleEdit = () => {
   console.log(user)
   console.log(user._id)

            fetch(`http://localhost:5000/api/user/${user._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            })
            .then(response => response.json())
            .then(data => {
              // Mettre à jour l'affichage de la facture mise à jour dans la liste des factures
              console.log('user mise à jour:', data);
            })
            .catch(error => console.error('Erreur lors de la mise à jour de user:', error));
          };
	
          const handleDelete = (user) => {
            setUser({
                _id:user._id,
                lastName:user.lastName,
              firstName: user.firstName,
              email: user.email,
              password: user.password,
              });
           
         
                     fetch(`http://localhost:5000/api/user/delete/${user._id}`, {
                       method: 'PUT',
                       headers: {
                         'Content-Type': 'application/json',
                       },
                       body: JSON.stringify(user),
                     })
                     .then(response => response.json())
                     .then(data => {
                       // Mettre à jour l'affichage de la facture mise à jour dans la liste des factures
                       console.log('user mise à jour:', data);
                     })
                     .catch(error => console.error('Erreur lors de la mise à jour de user:', error));
                   };
    return (
        <><Header /><>
            <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>modifierla l'utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Nom de l'utilisateur </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom "
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                autoFocus
                                required />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Prénom de l'utilisateur</Form.Label>
                            <Form.Control
                                type="text"

                                placeholder="Prénom "
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                autoFocus
                                required />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>E_mail de l'utilisateur</Form.Label>
                            <Form.Control
                                type="text"

                                placeholder="E_mail "
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                autoFocus
                                required />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Mot de passe </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Mot de passe"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                autoFocus
                                required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalEdit}>Fermer</Button>
                    <Button variant="primary" onClick={handleEdit}>confirmer</Button>
                </Modal.Footer>
            </Modal><>
                <Button variant="dark" className="nav-button" onClick={() => handleShowModal()}>
                    Ajouter un utilisateur
                </Button><>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>E_mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users
                            .filter((user) => user.actif === true)
                            .map((user) => (
                                <tr key={user._id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button onClick={() => handleShowModalEdit(user)} className="btn btn-warning">
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </Button>
                                        <Button onClick={() => handleDelete(user)} className="btn btn-danger">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>   <h1>Creer un compte utilisateur</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label>Nom de l'utilisateur </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nom "
                                        name="lastName"
                                        value={data.lastName}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label>Prénom de l'utilisateur</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="Prénom "
                                        value={data.firstName}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label>E_mail de l'utilisateur</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="E_mail "
                                        value={data.email}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label>Mot de passe </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="password"
                                        placeholder="Mot de passe"
                                        value={data.password}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>

                                {error && <div>{error}</div>}

                            </form></Modal.Body> <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>Fermer</Button>
                            <Button variant="primary" onClick={handleSubmit}>confirmer</Button>
                        </Modal.Footer>
                    </Modal> </></></></>
    );
};

export default AddUser;

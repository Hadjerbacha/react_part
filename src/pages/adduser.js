import { Modal, Table, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect  } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
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
        role: '',
      };
      const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
        role: "",
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
            role: '',
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
            role: user.role,
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
              role: user.role,
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
        <>   <Navbar />
        <br /><br /><>
            <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>modifier l'utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput21">
                            <Form.Label>Nom de l'utilisateur </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom "
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                autoFocus
                                required />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput22">
                            <Form.Label>Prénom de l'utilisateur</Form.Label>
                            <Form.Control
                                type="text"

                                placeholder="Prénom "
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                autoFocus
                                required />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput23">
                            <Form.Label>E_mail de l'utilisateur</Form.Label>
                            <Form.Control
                                type="text"

                                placeholder="E_mail "
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                autoFocus
                                required />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput24">
                            <Form.Label>Mot de passe </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Mot de passe"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                autoFocus
                                required />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput25">
                            <Form.Label>Role </Form.Label>
                            <Form.Control
                                as="select" // Utilisez "as" avec la valeur "select" pour créer un champ de sélection
                                value={user.role}
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                                autoFocus
                                required
                            >
                                <option value="user">utilisateur</option>
                                <option value="admin">administrateur</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalEdit}>Fermer</Button>
                    <Button variant="primary" onClick={handleEdit}>confirmer</Button>
                </Modal.Footer>
            </Modal><>
                <Button    style={{ marginLeft: '15px' }} className="nav-button" onClick={() => handleShowModal()}>
                <FontAwesomeIcon icon={faPlus} /> Ajouter un utilisateur
                </Button><>
                <br /><br />
                    <Table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>E_mail</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users
                            .filter((user) => user.actif === true)
                            .map((user) => (
                                <tr key={user._id}>
                                    <td>{user.lastName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
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
                                <Form.Group controlId="exampleForm.ControlInput26">
                                    <Form.Label>Nom de l'utilisateur </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nom "
                                        name="lastName"
                                        value={data.lastName}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput27">
                                    <Form.Label>Prénom de l'utilisateur</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="Prénom "
                                        value={data.firstName}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput28">
                                    <Form.Label>E_mail de l'utilisateur</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="E_mail "
                                        value={data.email}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput29">
                                    <Form.Label>Mot de passe </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="password"
                                        placeholder="Mot de passe"
                                        value={data.password}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput30">
                            <Form.Label>Role </Form.Label>
                            <Form.Control
                                as="select" // Utilisez "as" avec la valeur "select" pour créer un champ de sélection
                                name="role"
                                placeholder="Role"
                                value={data.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="user">utilisateur</option>
                                <option value="admin">Administrateur</option>
                            </Form.Control>
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

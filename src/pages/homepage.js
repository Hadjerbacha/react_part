/*import React from "react";

const HomePage = () => {

  return (
    <div>
        <style>
        {`
            .div-img {
                background-image: url(sona.jpg);
            }
          
        `}
        </style>
      <main className="div-img">

      </main>
      <footer>
        &copy; 2023 Sonatrach 
      </footer>
    </div>
  );
};

export default HomePage;*/
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
function HomePage() {
    const handleNavigate = (route) => {
        window.location.href = route;
      };
  return (
    <div>
        <br/><br/>
      <Container fluid>
        <Row>
          <Col md={9}>
            <Button variant="dark" className="nav-button" onClick={() => handleNavigate('/page1')}>
              Enregistrer Facture
            </Button>{' '}
            <Button variant="secondary" className="nav-button" onClick={() => handleNavigate('/fiche-bon-payer')}>
              Fiche Bon à Payer
            </Button>{' '}
            <Button variant="dark" className="nav-button" onClick={() => handleNavigate('/page2')}>
              Ajouter Prestataire
            </Button>{' '}
            <Button variant="secondary" className="nav-button" onClick={() => handleNavigate('/consulter-utilisateurs')}>
              Consulter Utilisateurs
            </Button>{' '}
            <Button variant="dark" className="nav-button" onClick={() => handleNavigate('/tableau-de-bord')}>
              Tableau de Bord
            </Button>{' '}
            <Button variant="secondary" className="nav-button" onClick={() => handleNavigate('/archive')}>
              Archive
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;

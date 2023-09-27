import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button, Table } from 'react-bootstrap';
import Select from 'react-select';

function ArchivePage() {
  const years = Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => new Date().getFullYear() - i);
  const [factures, setFactures] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleUserButtonClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleDownloadClick = () => {
    if (!selectedYear) {
      // L'année n'est pas sélectionnée, vous pouvez afficher un message d'erreur ici.
      return;
    }

    // ... Votre logique de téléchargement CSV
  };

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
  <div style={{ margin: '0 10px  ' }}></div> {/* Espace horizontal de 10 pixels */}
  <Select
    placeholder="Sélectionner l'utilisateur"
    options={users.map((user) => ({
      label: user.lastName,
      value: user._id,
    }))}
    onChange={(selectedUser) => handleUserButtonClick(selectedUser.value)}
  />
  <div style={{ marginLeft: '700px' }}></div> 
  <Button variant="success" onClick={handleDownloadClick}>
            Télécharger
          </Button>
</div>
<br/>
          <Table striped bordered hover style={{ width: '100%', margin: '0 auto' }}>
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
    return (selectedYear === null || factureYear === selectedYear) && (selectedUserId === null || facture.userId === selectedUserId);
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
      </div>
    </div>
  );
}

export default ArchivePage;


/*import React, { useState } from 'react';
import './archive.css'; // Assurez-vous d'ajouter le fichier CSS approprié
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Utilisation d'icônes de flèches
import Navbar from './Navbar';
import { Button } from 'react-bootstrap';

function ArchivePage() {
    const years = [2025,2024,2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000]; 
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = (scrollOffset) => {
    setScrollLeft(scrollLeft + scrollOffset);
  };

    const [selectedYear, setSelectedYear] = useState(null);

  // Supposons que vous ayez des données de facture pour chaque année
  const archiveData = {
    2022: [
      {
        N: 1,
        Prestataire_fournisseur: 'Fournisseur A',
        // Ajoutez d'autres champs de données ici
      },
      {
        N: 2,
        Prestataire_fournisseur: 'Fournisseur B',
        // Ajoutez d'autres champs de données ici
      },
      // Ajoutez d'autres factures pour 2022
    ],
    2021: [
      // Données pour 2021
    ],
    2020: [
      // Données pour 2020
    ],
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleDownloadClick = () => {
    if (selectedYear) {
      // Obtenez les données de facture de l'année sélectionnée
      const selectedYearData = archiveData[selectedYear];

      // Créez un tableau CSV en concaténant toutes les lignes de données
      const csvData = selectedYearData.map((facture) => {
        // Utilisez des tabulations pour séparer les champs au lieu de virgules
        return `${facture.N}\t${facture.Prestataire_fournisseur}\t...`; // Ajoutez d'autres champs ici
      });

      // Ajoutez un en-tête CSV pour les colonnes (remplacez par vos en-têtes de colonne réels)
      const csvHeader = 'N°\tPrestataire/Fournisseur\t...'; // Ajoutez d'autres en-têtes ici

      // Combiner l'en-tête et les données en une seule chaîne CSV
      const csvContent = `${csvHeader}\n${csvData.join('\n')}`;

      // Créez un objet Blob à partir du contenu CSV
      const blob = new Blob([csvContent], { type: 'text/csv' });

      // Générez un URL pour le Blob
      const csvURL = URL.createObjectURL(blob);

      // Créez un élément d'ancre pour le téléchargement du fichier CSV
      const downloadLink = document.createElement('a');
      downloadLink.href = csvURL;
      downloadLink.download = `factures_${selectedYear}.csv`; // Nom du fichier CSV

      // Simulez un clic sur le lien pour déclencher le téléchargement
      downloadLink.click();

      // Libérez la ressource URL
      URL.revokeObjectURL(csvURL);
    }
  };

  return (
    <div>
    <Navbar />
    <div className="archive-container">
      <button
        className={`scroll-button left ${scrollLeft === 0 ? 'disabled' : ''}`}
        onClick={() => handleScroll(-100)}
        disabled={scrollLeft === 0}
      >
        <FaChevronLeft />
      </button>
      <div className="horizontal-scroll-container">
        <div className="horizontal-scroll" style={{ transform: `translateX(-${scrollLeft}px)` }}>
          {years.map((year) => (
                <button
            key={year}
            onClick={() => handleYearClick(year)}
            className={`year-button ${year === selectedYear ? 'active' : ''}`}>
              {year}
            </button>
          ))}
        </div>
      </div>
      <button
        className={`scroll-button right ${scrollLeft === (years.length - 1) * 100 ? 'disabled' : ''}`}
        onClick={() => handleScroll(100)}
        disabled={scrollLeft === (years.length - 1) * 100}
      >
        <FaChevronRight />
      </button>
    </div>
    <div className="content">
      {selectedYear && archiveData[selectedYear] && (
        <div>
          <h3>Année {selectedYear}</h3>
          <table className="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Prestataire/Fournisseur</th>
              </tr>
            </thead>
            <tbody>
              {archiveData[selectedYear].map((facture) => (
                <tr key={facture.N}>
                  <td>{facture.N}</td>
                  <td>{facture.Prestataire_fournisseur}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button variant="success" onClick={handleDownloadClick}>
            Télécharger
          </Button>
        </div>
      )}
     </div>
    </div>
  );
}

export default ArchivePage;*/
    

/*import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar';
import './archive.css';

function ArchivePage() {
  // Supposons que vous ayez des années d'archives
  const years = [2025,2024,2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000]; 

  const [selectedYear, setSelectedYear] = useState(null);

  // Supposons que vous ayez des données de facture pour chaque année
  const archiveData = {
    2022: [
      {
        N: 1,
        Prestataire_fournisseur: 'Fournisseur A',
        // Ajoutez d'autres champs de données ici
      },
      {
        N: 2,
        Prestataire_fournisseur: 'Fournisseur B',
        // Ajoutez d'autres champs de données ici
      },
      // Ajoutez d'autres factures pour 2022
    ],
    2021: [
      // Données pour 2021
    ],
    2020: [
      // Données pour 2020
    ],
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleDownloadClick = () => {
    if (selectedYear) {
      // Obtenez les données de facture de l'année sélectionnée
      const selectedYearData = archiveData[selectedYear];

      // Créez un tableau CSV en concaténant toutes les lignes de données
      const csvData = selectedYearData.map((facture) => {
        // Utilisez des tabulations pour séparer les champs au lieu de virgules
        return `${facture.N}\t${facture.Prestataire_fournisseur}\t...`; // Ajoutez d'autres champs ici
      });

      // Ajoutez un en-tête CSV pour les colonnes (remplacez par vos en-têtes de colonne réels)
      const csvHeader = 'N°\tPrestataire/Fournisseur\t...'; // Ajoutez d'autres en-têtes ici

      // Combiner l'en-tête et les données en une seule chaîne CSV
      const csvContent = `${csvHeader}\n${csvData.join('\n')}`;

      // Créez un objet Blob à partir du contenu CSV
      const blob = new Blob([csvContent], { type: 'text/csv' });

      // Générez un URL pour le Blob
      const csvURL = URL.createObjectURL(blob);

      // Créez un élément d'ancre pour le téléchargement du fichier CSV
      const downloadLink = document.createElement('a');
      downloadLink.href = csvURL;
      downloadLink.download = `factures_${selectedYear}.csv`; // Nom du fichier CSV

      // Simulez un clic sur le lien pour déclencher le téléchargement
      downloadLink.click();

      // Libérez la ressource URL
      URL.revokeObjectURL(csvURL);
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="ml-3">Archives</h2>
      <div className="year-bar">
        {years.map((year) => (
          <Button
            key={year}
            onClick={() => handleYearClick(year)}
            className={`year-button ${year === selectedYear ? 'active' : ''}`}
          >
            {year}
          </Button>
        ))}
      </div>
      <div className="content">
      {selectedYear && archiveData[selectedYear] && (
        <div>
          <h3>Année {selectedYear}</h3>
          <table className="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Prestataire/Fournisseur</th>
              </tr>
            </thead>
            <tbody>
              {archiveData[selectedYear].map((facture) => (
                <tr key={facture.N}>
                  <td>{facture.N}</td>
                  <td>{facture.Prestataire_fournisseur}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button variant="success" onClick={handleDownloadClick}>
            Télécharger
          </Button>
        </div>
      )}
     </div>
    </div>
  );
}

export default ArchivePage;*/
/*import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar';

function ArchivePage() {
    const years = [2025,2024,2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000]; 

  const [selectedYear, setSelectedYear] = useState(null);

  const archiveData = {
    // Vos données d'archive ici...
  };

  const yearBarRef = useRef(null); // Référence pour la barre de défilement horizontale

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleDownloadClick = () => {
    // Implémentez la logique de téléchargement ici
  };

  const handleScrollLeft = () => {
    // Faites défiler la barre d'années vers la gauche
    yearBarRef.current.scrollLeft -= 100; // Vous pouvez ajuster la valeur de défilement
  };

  const handleScrollRight = () => {
    // Faites défiler la barre d'années vers la droite
    yearBarRef.current.scrollLeft += 100; // Vous pouvez ajuster la valeur de défilement
  };

  return (
    <div>
      <Navbar /> 
      <h2 className="ml-3">Archives</h2>
      <div className="year-bar" ref={yearBarRef}>
        
        <Button onClick={handleScrollLeft} className="scroll-button left">
          &#8249;
        </Button>
        {years.map((year) => (
          <Button
            key={year}
            onClick={() => handleYearClick(year)}
            className={`year-button ${year === selectedYear ? 'active' : ''}`}
          >
            {year}
          </Button>
        ))}
        <Button onClick={handleScrollRight} className="scroll-button right">
          &#8250;
        </Button>
      </div>
      <div className="content">
        {selectedYear && archiveData[selectedYear] && (
          <div>
            <h3>Année {selectedYear}</h3>
            <table className="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Prestataire/Fournisseur</th>
              </tr>
            </thead>
            <tbody>
              {archiveData[selectedYear].map((facture) => (
                <tr key={facture.N}>
                  <td>{facture.N}</td>
                  <td>{facture.Prestataire_fournisseur}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button variant="success" onClick={handleDownloadClick}>
            Télécharger
          </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchivePage;*/

/*import React, { useState } from 'react';
import Navbar from './Navbar';
import {  ScrollMenu } from 'react-horizontal-scrolling-menu';
import { Table, Button } from 'react-bootstrap';

function ArchivePage() {
    const years = [2025,2024,2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000]; 
  const [selectedYear, setSelectedYear] = useState(null);

  const archiveData = {
    // Vos données d'archive ici...
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleDownloadClick = () => {
    if (selectedYear) {
      // Obtenez les données de facture de l'année sélectionnée
      const selectedYearData = archiveData[selectedYear];

      // Créez un tableau CSV en concaténant toutes les lignes de données
      const csvData = selectedYearData.map((facture) => {
        // Utilisez des tabulations pour séparer les champs au lieu de virgules
        return `${facture.N}\t${facture.Prestataire_fournisseur}\t...`; // Ajoutez d'autres champs ici
      });

      // Ajoutez un en-tête CSV pour les colonnes (remplacez par vos en-têtes de colonne réels)
      const csvHeader = 'N°\tPrestataire/Fournisseur\t...'; // Ajoutez d'autres en-têtes ici

      // Combiner l'en-tête et les données en une seule chaîne CSV
      const csvContent = `${csvHeader}\n${csvData.join('\n')}`;

      // Créez un objet Blob à partir du contenu CSV
      const blob = new Blob([csvContent], { type: 'text/csv' });

      // Générez un URL pour le Blob
      const csvURL = URL.createObjectURL(blob);

      // Créez un élément d'ancre pour le téléchargement du fichier CSV
      const downloadLink = document.createElement('a');
      downloadLink.href = csvURL;
      downloadLink.download = `factures_${selectedYear}.csv`; // Nom du fichier CSV

      // Simulez un clic sur le lien pour déclencher le téléchargement
      downloadLink.click();

      // Libérez la ressource URL
      URL.revokeObjectURL(csvURL);
    }
  };

  const yearItems = years.map((year) => (
    <div
      key={year}
      className={`year-item ${year === selectedYear ? 'active' : ''}`}
      onClick={() => handleYearClick(year)}
    >
      {year}
    </div>
  ));

  return (
    <div>
      <Navbar /> 
      <h2 className="ml-3">Archives</h2>
      <div className="year-bar">
        < ScrollMenu>
          {yearItems}
        </ ScrollMenu>
      </div>
      <div className="content">
        {selectedYear && archiveData[selectedYear] && (
          <div>
            <h3>Année {selectedYear}</h3>
            <Table className="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Prestataire/Fournisseur</th>
              </tr>
            </thead>
            <tbody>
              {archiveData[selectedYear].map((facture) => (
                <tr key={facture.N}>
                  <td>{facture.N}</td>
                  <td>{facture.Prestataire_fournisseur}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant='success' onClick={handleDownloadClick}>Télécharger</Button>
          </div>
        )}
      </div>
    </div>
  ); 
}

export default ArchivePage;*/



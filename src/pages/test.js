// Composant React
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [numbers, setNumbers] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    // Récupérer les numéros depuis le serveur lors du chargement initial
    async function fetchNumbers() {
      try {
        const response = await axios.get('http://localhost:5000/obtenir-numeros');
        setNumbers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des numéros depuis le serveur:', error);
      }
    }

    fetchNumbers();
  }, []); // Exécuté une seule fois lors du chargement initial

  const addNumber = async () => {
    const date = new Date();
    const code = `${count}-${date.getMonth() + 1}/${date.getFullYear()}`;
    setNumbers([...numbers, { code }]); // Mettre à jour localement

    try {
      await axios.post('http://localhost:5000/ajouter-entree', { count });
      console.log('Numéro ajouté avec succès dans la base de données.');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du numéro dans la base de données:', error);
    }

    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={addNumber}>Ajouter un numéro</button>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number.code}</li>
        ))}
      </ul>
      <table>
        <thead>
          <tr>
            <th>Numéro</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((number, index) => (
            <tr key={index}>
              <td>{number.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Test;


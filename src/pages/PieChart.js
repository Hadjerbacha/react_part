import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const [prestataires, setPrestataires] = useState([]);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchPrestataires = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/prestataires');
        setPrestataires(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des prestataires:', error);
      }
    };

    fetchPrestataires();
  }, []);

  useEffect(() => {
    if (prestataires.length > 0) {
      // Comptez le nombre de prestataires dans chaque lieu
      const counts = {
        est: 0,
        ouest: 0,
        nord: 0,
        sud: 0,
      };

      prestataires.forEach((prestataire) => {
        switch (prestataire.lieux) {
          case 'est':
            counts.est++;
            break;
          case 'ouest':
            counts.ouest++;
            break;
          case 'nord':
            counts.nord++;
            break;
          case 'sud':
            counts.sud++;
            break;
          default:
            break;
        }
      });

      // Calculez la somme totale des prestataires
      const totalPrestataires = prestataires.length;

      // Calculez les pourcentages
      const percentages = {
        est: (counts.est / totalPrestataires) * 100,
        ouest: (counts.ouest / totalPrestataires) * 100,
        nord: (counts.nord / totalPrestataires) * 100,
        sud: (counts.sud / totalPrestataires) * 100,
      };

      const pieData = {
        labels: ['Est', 'Ouest', 'Nord', 'Sud'],
        datasets: [
          {
            data: [percentages.est, percentages.ouest, percentages.nord, percentages.sud],
            backgroundColor: ['blue', 'green', 'red', 'orange'],
          },
        ],
      };

      if (chart) {
        chart.destroy();
      }

      const ctx = document.getElementById('pieChart').getContext('2d');
      ctx.canvas.width = 10;
      ctx.canvas.height = 10;
      const newChart = new Chart(ctx, {
        type: 'pie',
        data: pieData,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Répartition des prestataires par lieu', // Titre du graphique
              font: {
                size: 16, // Taille de la police du titre
                weight: 'bold', // Poids de la police du titre
              },
            },
          },
        },
      });

      setChart(newChart);
    }
  }, [prestataires, chart]);

  return (
    <div style={{ width: '60%', margin: '0 auto' }}>
    
      <canvas id="pieChart"></canvas>
    </div>
  );
};

export default PieChart;

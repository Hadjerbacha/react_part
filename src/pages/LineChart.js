import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importez Chart.js

const LineChart = () => {
  const [factures, setFactures] = useState([]);
  const chartRef = useRef(null); 

  useEffect(() => {
    fetch('http://localhost:5000/api/facture')
      .then((response) => response.json())
      .then((data) => setFactures(data))
      .catch((error) => console.error('Error fetching factures:', error));
  }, []);

  // Créez un élément canvas pour le graphique
  useEffect(() => {
    if (chartRef.current) {
      // Détruire le graphique existant s'il y en a un
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const currentYear = new Date().getFullYear();
    const currentYearFactures = factures.filter((facture) => {
      const date = new Date(facture.Datefacture);
      return date.getFullYear() === currentYear;
    });

    // Tableau des abréviations des mois
    const monthAbbreviations = ['janv', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];

    // Créez un objet pour stocker les totaux par mois
    const monthlyTotals = {};

    currentYearFactures.forEach((facture) => {
      const date = new Date(facture.Datefacture);
      const month = date.getMonth();

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }

      monthlyTotals[month] += facture.montant;
    });

    // Convertissez les totaux en un tableau avec un total pour chaque mois
    const lineChartData = Array.from({ length: 12 }, (_, i) => {
      const monthTotal = monthlyTotals[i] || 0;
      return {
        x: monthAbbreviations[i], // Utilisez l'abréviation du mois
        y: monthTotal,
      };
    });

    // Créez le graphique avec Chart.js
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: lineChartData.map((dataPoint) => dataPoint.x),
        datasets: [
          {
            label: 'Montant total',
            data: lineChartData.map((dataPoint) => dataPoint.y),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Montant total',
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Vous pouvez afficher ou masquer la légende en fonction de vos besoins
          },
        }, plugins: {
          title: {
            display: true,
            text: 'Évolution mensuelle des montants de facturation',
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
      },
    });

    chartRef.current = myChart;
  }, [factures]);

  return (
      <><div style={{ width: '70%', margin: '0 auto' }}>
      
          <canvas id="myChart"></canvas>
      </div></>
  
  );
};

export default LineChart;

/*import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const TableToPDF = ({ data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ head: [["Header 1", "Header 2"]], body: data });
    doc.save("table.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Générer PDF</button>
    </div>
  );
};

export default TableToPDF;*/
/*import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const TableToPDF = ({ data }) => {
  const generatePDFAndSendEmail = () => {
    const doc = new jsPDF();
    doc.autoTable({ head: [["Header 1", "Header 2"]], body: data });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const emailLink = `mailto:?subject=Tableau%20PDF&body=Veuillez%20trouver%20ci-joint%20le%20fichier%20PDF%20contenant%20votre%20tableau.`;
    window.location.href = `${emailLink}&attachment=${pdfUrl}`;
  };

  return (
    <div>
      <button onClick={generatePDFAndSendEmail}>Envoyer par e-mail</button>
    </div>
  );
};

export default TableToPDF;*/
/*import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const TableToPDF = ({ data }) => {
  const generatePDFAndOpenEmailClient = () => {
    const doc = new jsPDF();
    doc.autoTable({ head: [["Header 1", "Header 2"]], body: data });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Ouvre le client de messagerie avec un nouveau message préparé
    const emailLink = `mailto:destinataire@example.com?subject=Tableau%20PDF&body=Veuillez%20trouver%20ci-joint%20le%20fichier%20PDF%20contenant%20votre%20tableau.`;
    window.location.href = `${emailLink}&attachment=${pdfUrl}`;
  };

  return (
    <div>
      <button onClick={generatePDFAndOpenEmailClient}>Envoyer par e-mail</button>
    </div>
  );
};

export default TableToPDF;*/
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TableToPDFAndEmail = ({ data }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ head: [['Header 1', 'Header 2']], body: data });

    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };

  const sendEmail = () => {
    if (pdfUrl) {
      const emailLink = `mailto:?subject=Tableau%20PDF&body=Veuillez%20trouver%20ci-joint%20le%20fichier%20PDF%20contenant%20votre%20tableau.`;
      window.location.href = `${emailLink}&attachment=${pdfUrl}`;
    }
  };

  return (
    <div>
      <button onClick={generatePDF}>Générer PDF</button>
      {pdfUrl && (
        <button onClick={sendEmail} disabled={!pdfUrl}>
          Envoyer par e-mail
        </button>
      )}
    </div>
  );
};

export default TableToPDFAndEmail;




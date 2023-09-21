
import jsPDF from 'jspdf';

const imprimer = (facture) => {
  const pdf = new jsPDF();

  const img = new Image();
  img.src = '/tele.jpg'; // Chemin vers votre image
  img.onload = () => {
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (imgWidth * img.height) / img.width; // Fix the calculation

    // Ajouter l'image au PDF en la redimensionnant pour qu'elle occupe toute la page
    pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);

    // Ajouter du texte sur l'image
    pdf.setFontSize(12);
    pdf.text(` ${facture.factureN}`,55, 52);
    pdf.text(` ${facture.Prestataire_fournisseur}`, 155, 48);
    pdf.text(` ${facture.observations}`, 43, 267);
    pdf.text(` ${facture.montant}`, 175, 166);
    pdf.text(`005`, 160, 116);
    pdf.text(`X`, 103, 143);
    pdf.text(`X`, 94, 143);
    pdf.text(` ${facture.montant}`, 175, 223);
    pdf.text(` ${facture.montant}`, 99, 223);
    pdf.text(` ${facture.montant}`, 99, 174);
    pdf.text(` ${facture.imputation}`, 70, 174);

    
    const dateFacture = facture.Datefacture;
    const dateParties = dateFacture.split('-'); // Divisez la date en parties : année, mois, jour
    
    const annee = dateParties[0]; // Récupérez l'année
    const anneeAbregee = annee.slice(-2);
    const mois = dateParties[1];  // Récupérez le mois
    const jour = dateParties[2];  // Récupérez le jour
    pdf.text(` ${mois}`, 112, 72);
    pdf.text(` ${jour}`, 102, 72);
    pdf.text(` ${anneeAbregee}`, 122, 72);


    
    // Télécharger le PDF
    pdf.save('Fiche bon a payer');
  };
};

  export default imprimer;
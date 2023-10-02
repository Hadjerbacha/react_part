

  import jsPDF from 'jspdf';

const imprimer = (facture, message) => {
  if (facture._id === '') {
    message = 'Veuillez sélectionner une facture avant d\'imprimer.';
  } else {
    const pdf = new jsPDF();

    const img = new Image();
    img.src = '/tele.jpg'; // Chemin vers votre image
    img.onload = () => {
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (imgWidth * img.height) / img.width;

      // Ajouter l'image au PDF en la redimensionnant pour qu'elle occupe toute la page
      pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);

   
   // Ajouter du texte sur l'image
   pdf.setFontSize(12);
   pdf.text(` ${facture.factureN}`,55, 51);
   pdf.text(` ${facture.Prestataire_fournisseur}`, 155, 47.5);
   pdf.text(` ${facture.observations}`, 43, 266);
   pdf.text(` ${facture.montant}`, 168, 166);
   pdf.text(`005`, 160, 116);
   pdf.text(`X`, 103, 143);
   pdf.text(`X`, 94, 143);
   pdf.text(` ${facture.montant}`, 168, 223);
   pdf.text(` ${facture.montant}`, 91, 223);
   pdf.text(` ${facture.montant}`, 91, 174);
   pdf.text(` ${facture.imputation}`, 60, 174);

   
   const dateFacture = facture.Datefacture;
   const dateParties = dateFacture.split('-'); // Divisez la date en parties : année, mois, jour
   
   const annee = dateParties[0]; // Récupérez l'année
   const anneeAbregee = annee.slice(-2);
   const mois = dateParties[1];  // Récupérez le mois
   const jour = dateParties[2];  // Récupérez le jour
   pdf.text(` ${mois}`, 112, 73);
   pdf.text(` ${jour}`, 102, 73);
   pdf.text(` ${anneeAbregee}`, 122, 73);


   
      // Ouvrir le PDF dans une nouvelle fenêtre du navigateur plutôt que de le télécharger
      const pdfDataUri = pdf.output('datauristring');
      const pdfWindow = window.open();
      pdfWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
    };
  }
};

export default imprimer;

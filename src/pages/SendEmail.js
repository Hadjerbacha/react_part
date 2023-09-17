import React from "react";
import { Link } from "react-router-dom";

const SendEmail = ({ data }) => {
  const emailLink = `mailto:?subject=Tableau%20PDF&body=Veuillez%20trouver%20ci-joint%20le%20fichier%20PDF%20contenant%20votre%20tableau.`;

  return (
    <div>
      <Link to={emailLink}>Envoyer par e-mail</Link>
    </div>
  );
};

export default SendEmail;

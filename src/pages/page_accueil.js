/*import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [menuItems, setMenuItems] = useState([
    {
      title: "Home",
      url: "/",
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ]);

  const [logoSrc, setLogoSrc] = useState("/logo.png");
  const [backgroundSrc, setBackgroundSrc] = useState("/background.jpg");

  useEffect(() => {
    // Récupérez l'URL du logo et de l'arrière-plan de la base de données.
    fetch("/api/logo")
      .then(response => response.json())
      .then(logo => setLogoSrc(logo.url))
      .catch(error => console.error(error));

    fetch("/api/background")
      .then(response => response.json())
      .then(background => setBackgroundSrc(background.url))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <header>
        <nav>
          {menuItems.map(menuItem => (
            <a key={menuItem.title} href={menuItem.url}>{menuItem.title}</a>
          ))}
        </nav>
        <img src={logoSrc} alt="Logo" />
      </header>
      <main>
        <img src={backgroundSrc} alt="Background" />
      </main>
      <footer>
        &copy; 2023 My Company
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));*/
import React from "react";
import Header from "./header";
import Homepage from "./homepage";
const Pageaccueil = () => {

  return (
    <div>
      <Header />
      <Homepage />
    </div>
  );
};

export default Pageaccueil;

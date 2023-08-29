import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./LandingPage.css";
import logo from "../../../img/logo.png";

export default function LandingPage() {
  return (
    <div>
      <div className="container">
        <div className="column column-1">
          <h1>PI COUNTRIES 🚀</h1>

          <p
            style={{
              padding: "20px",
              background: "white",
              borderRadius: "5px",
            }}
          >
            "En esta pagina web donde podras aprender sobre paises y sus
            actividades"
          </p>
          <img
            style={{ width: "400px", marginTop: "4px" }}
            src={logo}
            alt="Logo"
          />
        </div>

        <div className="column column-2">
          <Link to="/home">
            <button className="button2">Exploremos el mundo!✈️🌎🗺️</button>
          </Link>
        </div>
      </div>
      <div>
        <footer className="footer">
          <div>
            <a href="https://www.linkedin.com/in/gonzalo-miguel-llanos-bb2b64224/">
              <p>Dev : Gonzalo Llanos</p>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

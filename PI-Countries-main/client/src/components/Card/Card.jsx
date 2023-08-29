import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card(props) {
  // console.log(props)
  return (
    <Link to={`/country2/${props.idPais}`}>
      <div className="card">
        <img
          style={{ width: "50px", alignItems: "center" }}
          src={props.urlImg}
          alt={props.name}
        />

        <div>
          <p>{props.name}</p>
        </div>
        <div className="nodefinudi">
          <p>{props.idPais}</p>
          <p>{props.continent}</p>
        </div>
      </div>
    </Link>
  );
}

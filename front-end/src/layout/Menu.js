import React from "react";
// import "./Menu.css";
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */



function Menu() {
  return (
    <nav>
      <Link className="nav-link" to="/" style={{ color: "black", fontWeight: "bolder", textAlign: "center", fontSize: "44px", width: "100%"}}>
        <h1 className="nav-title">Periodic Tables</h1>
      </Link>
      <div>
        <Link className="nav-link" to="/dashboard" style={{ color: "black", display: "inline-flex", fontSize: "18px", width: "150px" }}>
          <span className="oi oi-dashboard" />
          &nbsp;Dashboard
        </Link>
        <Link className="nav-link" to="/search" style={{ color: "black", display: "inline-flex", fontSize: "18px", width: "100px" }}>
          <span className="oi oi-magnifying-glass" />
          &nbsp;Search
        </Link>
        <Link className="nav-link" to="/reservations/new" style={{ color: "black", display: "inline-flex", fontSize: "18px", width: "200px" }}>
          <span className="oi oi-plus" />
          &nbsp;New Reservation
        </Link>
        <Link className="nav-link" to="/tables/new" style={{ color: "black", display: "inline-flex", fontSize: "18px", width: "140px" }}>
          <span className="oi oi-layers" />
          &nbsp;New Table
        </Link>
      </div>
    </nav>
  );
}

export default Menu;

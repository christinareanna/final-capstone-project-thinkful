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
      <Link className="nav-link" to="/" style={{ color: "black", fontWeight: "bolder" }}>
        <div className="nav-title">Periodic Tables</div>
      </Link>
      <Link className="nav-link" to="/dashboard" style={{ color: "black" }}>
        <span className="oi oi-dashboard" />
        &nbsp;Dashboard
      </Link>
      <Link className="nav-link" to="/search" style={{ color: "black" }}>
        <span className="oi oi-magnifying-glass" />
        &nbsp;Search
      </Link>
      <Link className="nav-link" to="/reservations/new" style={{ color: "black" }}>
        <span className="oi oi-plus" />
        &nbsp;New Reservation
      </Link>
      <Link className="nav-link" to="/tables/new" style={{ color: "black" }}>
        <span className="oi oi-layers" />
        &nbsp;New Table
      </Link>
    </nav>
  );
}

export default Menu;

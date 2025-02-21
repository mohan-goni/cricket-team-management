import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="heading">Cricket Manager</h1>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
       
        <li><Link to="/players">Players List</Link></li>
        <li><Link to="/add-player">Add Player</Link></li>
        <li><Link to="/delete-player">Delete Player</Link></li>
        <li><Link to="/search-player">Search Player</Link></li>
      </ul>
    </nav>
  );
}

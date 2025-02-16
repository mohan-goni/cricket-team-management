import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" >Players List</Link>
      <Link to="/add">Add Player</Link>
      <Link to="/delete">Delete Player</Link>
    </nav>
  );
}

export default Navbar;

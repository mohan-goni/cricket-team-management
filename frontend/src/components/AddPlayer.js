import React, { useState } from "react";
import "../styles/AddPlayer.css"

const addPlayersAPI = "http://localhost:3000/players/";

export default function AddPlayer() {
  const [playerName, setPlayerName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!playerName || !jerseyNumber || !role) {
      setMessage("All fields are required!");
      return;
    }
  
    try {
      const response = await fetch(addPlayersAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName, jerseyNumber, role }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to add player.");
      }
  
      setMessage(data.message || "Player added successfully!");
  
      setPlayerName("");
      setJerseyNumber("");
      setRole("");
    } catch (error) {
      console.error("Error adding player:", error);
      setMessage(error.message);
    }
  };
  
  return (
    <div className="container">
      <h2>Add Player</h2>
      <form onSubmit={handleSubmit} className="glass-form">
        <input
          type="text"
          placeholder="Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <input
            type="number"
            placeholder="Jersey Number"
            value={jerseyNumber}
            onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setJerseyNumber(value >= 0 ? value : ""); 
            }}
            />

       <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="" disabled>Select Role</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-Rounder">All-Rounder</option>
            <option value="Wicket-Keeper">Wicket-Keeper</option>
      </select>

        <button type="submit">Add Player</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

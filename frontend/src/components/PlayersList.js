import React, { useState, useEffect } from "react";
import "../styles/PlayersList.css";

const playersListAPI = "http://localhost:3000/players/";

export default function PlayersList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(playersListAPI)
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error("Error fetching players:", err));
  }, []);

  return (
    <div className="players-container">
      <h2>Players List</h2>
      <table className="players-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Jersey Number</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((player) => (
              <tr key={player.player_id}>
                <td>{player.player_id}</td>
                <td>{player.player_name}</td>
                <td>{player.role}</td>
                <td>{player.jersey_number}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No players found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

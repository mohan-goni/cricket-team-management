import React, { useState } from "react";
import "../styles/SearchPlayer.css";

const searchPlayerAPI = "http://localhost:3000/players/";

export default function SearchPlayer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setMessage("Please enter a Player Name or Jersey Number.");
      return;
    }

    try {
      console.log("Fetching from API:", `${searchPlayerAPI}search/${searchQuery.trim()}`);

      const response = await fetch(`${searchPlayerAPI}search/${searchQuery.trim()}`);

      if (!response.ok) {
        throw new Error("No matching players found.");
      }

      const data = await response.json();
      console.log("Received Data:", data);

      setPlayers(data);
      setMessage("");
      setSearchQuery(""); // ✅ Clear input after searching
    } catch (error) {
      console.error("Error fetching player:", error);
      setPlayers([]);
      setMessage(error.message);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Player</h2>
      <input
        type="text"
        placeholder="Enter Player Name or Jersey Number"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {message && <p className="message">{message}</p>}

      {players.length > 0 && (
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
            {players.map((player) => (
              <tr key={player.player_id}>
                <td>{player.player_id}</td>
                <td>{player.player_name}</td>
                <td>{player.role}</td>
                <td>{player.jersey_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

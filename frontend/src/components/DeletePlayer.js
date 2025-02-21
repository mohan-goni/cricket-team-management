import React, { useState } from "react";
import "../styles/DeletePlayer.css";
import { API_BASE_URL } from "../config";

const playersListAPI = `${API_BASE_URL}/players/`;
export default function DeletePlayer() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!query.trim()) {
      setMessage("Please enter a valid Player Name or ID.");
      return;
    }

    try {
      const response = await fetch(`${deletePlayerAPI}${query.trim()}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error deleting player.");
      }

      setMessage(data.message);
      setQuery(""); // ✅ Clear input after successful deletion
    } catch (error) {
      console.error("Error deleting player:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="delete-container">
      <h2>Delete Player</h2>
      <input
        type="text"
        placeholder="Enter Player Name or ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Player</button>
      <p className="message">{message}</p>
    </div>
  );
}

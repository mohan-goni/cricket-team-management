import React, { useState, useEffect } from "react";

const playersListAPI = "http://localhost:3000/players/";

export default function PlayersList() {
  const [data, setData] = useState([]); 

  useEffect(() => {
    fetch(playersListAPI)
      .then((res) => {
        console.log("Response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setData(data);
      })
      .catch((err) => console.error("Error fetching data:", err)); 
  }, []);
  return (
    <div className="bg-container" >
      <h2>Players List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Player Id</th>
            <th>Player Name</th>
            <th>Player Role</th>
            <th>Jersey Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map(player=>(
            <tr key={player.player_id}>
              <td>{player.player_id}</td>
              <td>{player.player_name}</td>
              <td>{player.role}</td>
              <td>{player.jersey_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


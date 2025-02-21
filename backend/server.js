const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;
const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Use process.env.PORT if available, otherwise default to 3000
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server starting at http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBandServer();

// Players API
app.get("/players/", async (request, response) => {
  const playersQuery = `SELECT * FROM cricket_team;`;
  const playersArray = await db.all(playersQuery);
  response.send(playersArray);
});

// Add Player API
app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const addPlayerQuery = `
    INSERT INTO cricket_team (player_name, jersey_number, role)
    VALUES ('${playerName}', ${jerseyNumber}, '${role}');
  `;
  await db.run(addPlayerQuery);
  response.json({ message: "Player Added to Team" });
});

// Search Player API
app.get("/players/search/:query", async (request, response) => {
  const { query } = request.params;
  const searchTerm = query.trim();

  let playerQuery;
  let params;

  if (!isNaN(searchTerm)) {
    playerQuery = `SELECT * FROM cricket_team WHERE jersey_number = ?`;
    params = [searchTerm];
  } else {
    playerQuery = `SELECT * FROM cricket_team WHERE LOWER(player_name) LIKE LOWER(?)`;
    params = [`%${searchTerm}%`];
  }

  console.log("Executing Query:", playerQuery, "with Params:", params);
  
  try {
    const players = await db.all(playerQuery, params);

    if (!players || players.length === 0) {
      return response.status(404).json({ message: "No matching players found." });
    }
    response.json(players);
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Player API
app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const { playerName, jerseyNumber, role } = request.body;
  const updatePlayerQuery = `
    UPDATE cricket_team
    SET player_name = '${playerName}', jersey_number = ${jerseyNumber}, role = '${role}'
    WHERE player_id = ${playerId};
  `;
  await db.run(updatePlayerQuery);
  response.json({ message: "Player Details Updated" });
});

// Delete Player API
app.delete("/players/:query", async (request, response) => {
  const { query } = request.params;
  let deleteQuery;
  let params;

  if (!isNaN(query)) {
    deleteQuery = `DELETE FROM cricket_team WHERE player_id = ?`;
    params = [query];
  } else {
    deleteQuery = `DELETE FROM cricket_team WHERE LOWER(player_name) = LOWER(?)`;
    params = [query];
  }

  console.log("Executing Delete Query:", deleteQuery, "with Params:", params);

  try {
    const result = await db.run(deleteQuery, params);
    if (result.changes === 0) {
      return response.status(404).json({ message: "Player not found." });
    }
    response.json({ message: "Player deleted successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;

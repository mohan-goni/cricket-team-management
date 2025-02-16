const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())
const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;
const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server starting at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBandServer();
// players API
app.get("/players/", async (request, response) => {
  const playersQuery = `
    select * from cricket_team;`;
  const playersArray = await db.all(playersQuery);
  response.send(playersArray);
});

//add players API
app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const addPlayerQuery = `
    insert into cricket_team
    (player_name,jersey_number,role)
    values
    (
        '${playerName}',
        ${jerseyNumber},
        '${role}');`;
  await db.run(addPlayerQuery);
  response.json({ message: "Player Added to Team" });

});

// GET player API
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const playerQuery = `
    select * from cricket_team 
    where player_id=${playerId};`;
  const player = await db.get(playerQuery);
  response.send(player);
});

//update player
app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const { playerName, jerseyNumber, role } = request.body;
  console.log(playerIdplayerId);
  const updatePlayerQuery = `
   update cricket_team
    set
    player_name= '${playerName}',
    jersey_number=  ${jerseyNumber},
    role=  '${role}'
    where player_id=${playerId};`;
  await db.run(updatePlayerQuery);
  response.json({"message":"Player Details Updated............"});
});

// DELETE player API
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  console.log(playerIdplayerId);
  const playerQuery = `
    delete from cricket_team 
    where player_id=${playerId};`;
  await db.run(playerQuery);
  response.json({"message":"Player Removed sucessfully.............."});
});
module.exports = app;
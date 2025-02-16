import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlayersList from "./components/PlayersList";
import AddPlayer from "./components/AddPlayer";
import DeletePlayer from "./components/DeletePlayer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PlayersList />} />
        <Route path="/add" element={<AddPlayer />} />
        <Route path="/delete" element={<DeletePlayer />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlayersList from "./components/PlayersList";
import AddPlayer from "./components/AddPlayer";
import DeletePlayer from "./components/DeletePlayer";
import SearchPlayer from "./components/SearchPlayer";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
 
        <Route path="/players" element={<PlayersList />} />
        <Route path="/add-player" element={<AddPlayer />} />
        <Route path="/delete-player" element={<DeletePlayer />} />
        <Route path="/search-player" element={<SearchPlayer />} />
      </Routes>
    </Router>
  );
}

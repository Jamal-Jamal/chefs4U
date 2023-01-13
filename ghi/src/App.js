import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import EventList from "./EventList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/events" element={<EventList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

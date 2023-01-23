import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import MainPage from "./MainPage";
import EventForm from "./EventForm";
import EditEventForm from "./EditEventForm";
import FavoritesList from "./FavoritesList";
import SignUpForm from "./Accounts/SignUpForm";
import LoginForm from "./Accounts/LoginForm";
import { AuthProvider, useToken } from "./Accounts/Authentication.js";
import ChefsPage from "./ChefsPage";

function GetToken() {
  useToken();
  return null;
}

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <NavBar />
        <AuthProvider>
          <GetToken />
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/signup" element={<SignUpForm />}></Route>
            <Route path="/add-event" element={<EventForm />}></Route>
            <Route path="/events/:id/edit" element={<EditEventForm />}></Route>
            <Route path="/events/favorites" element={<FavoritesList />}></Route>
            <Route path="/chef/:id" element={<ChefsPage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

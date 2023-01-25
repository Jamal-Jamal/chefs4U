import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import EventForm from "./EventForm";
import EditEventForm from "./EditEventForm";
import FavoritesList from "./FavoritesList";
import SignUpForm from "./Accounts/SignUpForm";
import LoginForm from "./Accounts/LoginForm";
import { AuthProvider, useToken } from "./Accounts/Authentication.js";
import ChefsPage from "./ChefsPage";
import ChefList from "./ChefList";
import EditChefForm from "./EditChefForm";

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
        <AuthProvider>
          <GetToken />
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/signup" element={<SignUpForm />}></Route>
            <Route path="/add-event" element={<EventForm />}></Route>
            <Route path="/events/:id/edit" element={<EditEventForm />}></Route>
            <Route path="/events/favorites" element={<FavoritesList />}></Route>
            <Route path="/chef/:id" element={<ChefsPage />}></Route>
            <Route path="/" element={<ChefList />}></Route>
            <Route path="/chef/:id/edit" element={<EditChefForm />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import EventList from "./EventList";
import SignUpForm from "./Accounts/SignUpForm";
import LoginForm from "./Accounts/LoginForm";
import { AuthProvider, useToken } from "./Accounts/Authentication.js";

function GetToken() {
  useToken();
  return null;
}
import EventForm from "./EventForm";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <NavBar />
        <AuthProvider>
          <GetToken />
          <Routes>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/signup" element={<SignUpForm />}></Route>
            <Route path="/events" element={<EventList />}></Route>
            <Route path="/add-event" element={<EventForm />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

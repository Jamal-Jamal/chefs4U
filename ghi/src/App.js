import React from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import './App.css';
import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm"

function App() {

    return (
        <div className = "App">
            <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm/>}>
                </Route>
                <Route path="/signup" element={<SignUpForm/>}>
                </Route>
            </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;

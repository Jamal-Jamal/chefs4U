// import React, { useState} from 'react';
import "./App.css";
// import SignUpForm from "./SignUpForm"
// import LoginForm from "./LoginForm"
import EventList from "./EventList";

function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  return (
    <div className="App">
      <EventList />
      {/* {
                currentForm === "login" ? <LoginForm /> : <SignUpForm />
            } */}
    </div>
  );
}

export default App;

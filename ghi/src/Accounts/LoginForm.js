import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useToken } from "./Authentication.js";

function LoginForm() {
  const navigate = useNavigate();
  const [token, login] = useToken();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    login(username, password);
    e.preventDefault();
  };

  function handleClick() {
    navigate("/signup");
  }

  useEffect(() => {
    if (token) {
      navigate("/events");
    }
  }, [token]);

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card text-black">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <Form className="form-outline mb-4" onSubmit={handleSubmit}>
                    <p>Please login to your account</p>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </Form.Group>
                    <div className="pt-1 mb-4">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                    <Button variant="primary" onClick={handleClick}>
                      Don't have an account? Sign up here
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

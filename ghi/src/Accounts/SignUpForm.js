import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate} from 'react-router-dom';
import { useToken } from './Authentication';
import Switch from './Switch';


class Data {
    constructor(username, password, name, is_chef=false, pay_rate=null, cuisine=null, years_of_experience=null,picture_url=null) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.is_chef = is_chef;
        this.pay_rate = pay_rate;
        this.cuisine = cuisine;
        this.years_of_experience = years_of_experience;
        this.picture_url = picture_url;
    }
  }


function SignUpForm(props) {
  const [token, login, logout, signup] = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isChef, setIsChef] = useState(false);
  const [payRate, setPayRate] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
        username: username,
        password: password,
        name: name,
        isChef: isChef,
        payRate: payRate,
        cuisine: cuisine,
        yearsOfExperience: yearsOfExperience,
        pictureUrl: pictureUrl,
    };
    let d = new Data();
    d.username = data.username;
    d.password = data.password;
    d.name = data.name;
    if (data.isChef) {
        d.is_chef = true;
        d.pay_rate = data.payRate;
        d.cuisine = data.cuisine;
        d.years_of_experience = data.yearsOfExperience;
        d.picture_url = data.pictureUrl;
    }
    try {
        const url = `http://localhost:8000/api/accounts`;
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(d)
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const jsonResponse = await response.json();
        console.log(jsonResponse);

        window.location.href = "/MainPage";
    } catch (error) {
        console.log(error);
        alert("There was an error. Please try again later.");
    }
    }


  return (
     <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    <Form className="login-form" onSubmit={handleSubmit}>
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

      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formIsChef">
        <Form.Check
          type="switch"
          label="Are you a chef?"
          checked={isChef}
          onChange={(event) => setIsChef(event.target.checked)}
        />
      </Form.Group>

      {isChef && (
        <>
          <Form.Group controlId="formPayRate">
            <Form.Label>Pay Rate</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter pay rate"
              value={payRate}
              onChange={(event) => setPayRate(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCuisine">
            <Form.Label>Cuisine</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter cuisine"
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formYearsOfExperience">
            <Form.Label>Years of Experience</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Years Of Experience"
              value={yearsOfExperience}
              onChange={(event) => setYearsOfExperience(event.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formPictureUrl">
                <Form.Label>Picture URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter picture URL"
                  value={pictureUrl}
                  onChange={(event) => setPictureUrl(event.target.value)}
                />
            </Form.Group>
        </>
        )}

      <Button variant="primary" type="submit">
        Sign up
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

export default SignUpForm;

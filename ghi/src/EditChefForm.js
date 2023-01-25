import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToken } from "./Accounts/Authentication.js";

function BootstrapInput(props) {
  const { id, labelText, value, onChange, type } = props;
  return (
    <div className="form-floating mb-3">
      <input
        value={value}
        onChange={onChange}
        placeholder={id}
        required
        type={type}
        name={id}
        id={id}
        className="form-control"
      />
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
    </div>
  );
}

function EditChefForm() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [ischef, setIsChef] = useState(false);
  const [cuisine, setCuisine] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [rate, setRate] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const { id } = useParams();
  const [token] = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChef() {
      const response = await fetch(
        `${process.env.REACT_APP_ACCOUNTS_HOST}/api/chef/${id}`
      );
      const data = await response.json();
      setUsername(data.username);
      setName(data.name);
      setIsChef(data.is_chef);
      setCuisine(data.cuisine);
      setYearsExperience(data.years_of_experience);
      setRate(data.pay_rate);
      setPictureUrl(data.picture_url);
    }
    fetchChef();
  }, [id]);

  const handleSubmit = (chef) => {
    chef.preventDefault();
    const data = {
      username: username,
      name: name,
      is_chef: ischef,
      pay_rate: rate,
      cuisine: cuisine,
      years_of_experience: yearsExperience,
      picture_url: pictureUrl,
    };
    const serviceUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        credentials: "include",
        "Content-Type": "application/json",
      },
    };
    fetch(serviceUrl, fetchConfig);
    handleRoute()
  };

  function handleRoute() {
    setTimeout(() => {navigate(`/chef/${id}`);}, 100)
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit} id="edit-chef-form">
            <BootstrapInput
              id="name"
              type="text"
              labelText="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <BootstrapInput
              id="cuisine"
              type="text"
              labelText="Cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              />
            <BootstrapInput
              id="yearsExperience"
              type="number"
              labelText="Years of Experience "
              onChange={(e) => setYearsExperience(e.target.value)}
              value={yearsExperience}
            />
            <BootstrapInput
              id="rate"
              type="text"
              labelText="Pay Rate"
              onChange={(e) => setRate(e.target.value)}
              value={rate}
            />
            <BootstrapInput
              id="pictureUrl"
              type="pictureUrl"
              labelText="Picture Url"
              onChange={(e) => setPictureUrl(e.target.value)}
              value={pictureUrl}
            />
            <button className="btn btn-primary me-2">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditChefForm;

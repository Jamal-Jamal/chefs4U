import React, { useState } from "react";

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

function EventForm(props) {
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      venue: venue,
      description: description,
      date: date,
      time: time,
      address: address,
      picture_url: pictureUrl,
    };

    const serviceUrl = `${process.env.REACT_APP_EVENTS_HOST}/api/events`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(serviceUrl, fetchConfig);
    setVenue("");
    setDescription("");
    setDate("");
    setTime("");
    setAddress("");
    setPictureUrl("");
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Host a new event</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <BootstrapInput
              id="venue"
              type="text"
              labelText="Venue"
              onChange={(e) => setVenue(e.target.value)}
              value={venue}
            />
            <div className="form-floating mb-3">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="description"
                name="description"
                id="description"
                className="form-control"
              />
              <label htmlFor="description" className="form-label">
                Description
              </label>
            </div>
            <BootstrapInput
              id="date"
              type="date"
              labelText="Date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
            <BootstrapInput
              id="time"
              type="time"
              labelText="Time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
            <BootstrapInput
              id="address"
              type="address"
              labelText="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <BootstrapInput
              id="pictureUrl"
              type="pictureUrl"
              labelText="Picture Url"
              onChange={(e) => setPictureUrl(e.target.value)}
              value={pictureUrl}
            />
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventForm;

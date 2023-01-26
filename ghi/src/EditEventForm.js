import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditEventForm.css";
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

function EditEventForm() {
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [attendeeCapacity, setAttendeeCapacity] = useState("");
  const { id } = useParams();
  const [submitted, setSubmitted] = useState("alert alert-danger d-none");
  const [token] = useToken();

  useEffect(() => {
    async function fetchEvent() {
      const response = await fetch(
        `${process.env.REACT_APP_EVENTS_HOST}/api/events/${id}`
      );
      const data = await response.json();
      setVenue(data.venue);
      setDescription(data.description);
      setDate(data.date);
      setTime(data.time);
      setAddress(data.address);
      setPictureUrl(data.picture_url);
      setAttendeeCapacity(data.attendee_capacity);
    }
    fetchEvent();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      venue: venue,
      description: description,
      date: date,
      time: time,
      address: address,
      picture_url: pictureUrl,
      attendee_capacity: attendeeCapacity,
      chef_id: event.chef_id,
    };
    const serviceUrl = `${process.env.REACT_APP_EVENTS_HOST}/api/events/${id}`;
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
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const serviceUrl = `${process.env.REACT_APP_EVENTS_HOST}/api/events/${id}`;
    const fetchConfig = {
      Authorization: `Bearer ${token}`,
      credentials: "include",
      method: "delete",
    };
    fetch(serviceUrl, fetchConfig).then((response) => {
      if (response.ok) {
        setVenue("");
        setDescription("");
        setDate("");
        setTime("");
        setAddress("");
        setPictureUrl("");
        setAttendeeCapacity("");
        setSubmitted("alert alert-danger");
      }
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Edit Event</h1>
          <form onSubmit={handleSubmit} id="edit-event-form">
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
            <BootstrapInput
              id="attendeeCapacity"
              type="number"
              labelText="Attendee Capacity"
              onChange={(e) => setAttendeeCapacity(e.target.value)}
              value={attendeeCapacity}
            />
            <button className="btn btn-primary me-2">Update</button>
            <button
              className="Delete btn btn-danger float-none me-2"
              type="submit"
              onClick={handleDelete}
            >
              Delete
            </button>
          </form>
          <div className={submitted} role="alert">
            This Event has been deleted
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditEventForm;

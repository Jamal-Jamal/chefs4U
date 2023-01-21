import { useEffect, useState } from "react";
import { useToken } from "./Accounts/Authentication.js";

function FavoritesList() {
  const [events, setEvents] = useState([]);
  const [token] = useToken();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_EVENTS_HOST}/api/favorite`, {
      Authorization: `Bearer ${token}`,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => {
        console.log(error);
        alert("You don't have any favorite events. Please favorite.");
        window.location.href = "/MainPage";
      });
  }, [token]);

  return (
    <div className="container">
      <h2 className="text-center my-4">My Favorites List</h2>
      <div className="row">
        {events.map((event) => (
          <div key={event.id}>
            <div className="card mb-3 shadow">
              <img
                src={event.picture_url}
                className="card-img-top"
                alt=""
                width="400px"
                height="400px"
              />
              <div className="card-body">
                <h3 className="card-title">{event.venue}</h3>
                <p className="card-text">
                  Date: {event.date} @ {event.address}
                </p>
                <p className="card-text">Address: {event.address}</p>
                <p className="card-text">Description: {event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;

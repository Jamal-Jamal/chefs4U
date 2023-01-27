import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToken } from "./Accounts/Authentication.js";

function EventColumn(props) {
  const [buttonClasses, setButtonClasses] = useState("btn btn-info d-none");
  const [favButtonClasses, setFavButtonClasses] = useState("btn d-none");
  let navigate = useNavigate();
  const routeChange = (id) => {
    navigate(`/events/${id}/edit`);
  };
  const handleClick = async (id) => {
    const data = {
      event_id: id,
    };
    const eventsURL = `${process.env.REACT_APP_EVENTS_HOST}/api/favorite`;
    const accountsURL = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/favorite`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${props.token}`,
        credentials: "include",
        "Content-Type": "application/json",
      },
    };
    setTimeout(() => {
      let temp = props.pressedFav + 1;
      props.setPressedFav(temp);
    }, 200);
    await fetch(eventsURL, fetchConfig);
    await fetch(accountsURL, fetchConfig);
  };
  useEffect(() => {
    if (props.accountId === Number(props.id)) {
      setButtonClasses("btn btn-info");
    }
    if (props.token) {
      setFavButtonClasses("btn btn-success");
    }
  }, [props.accountId, props.id, props.token, props.pressedFav]);

  return (
    <div className="col">
      {props.list.map((data, index) => {
        const dateString = data.date + "T" + data.time;
        const dateObj = new Date(dateString);
        const options = { timeStyle: "short" };
        const date = dateObj.toLocaleDateString();
        const time = dateObj.toLocaleTimeString([], options);
        return (
          <div key={index} className="card mb-3 shadow">
            <img src={data.picture_url} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{data.venue}</h5>
              <p className="card-text">
                Date: {date} @ {time}
              </p>
              <p className="card-text">Address: {data.address}</p>
              <p className="card-text">Description: {data.description}</p>
              <p className="card-text">
                Attendee Capacity: {data.attendee_capacity}
              </p>
              <p>
                Number of likes:{" "}
                {data.users_favorited ? data.users_favorited.length : 0}
              </p>
            </div>
            <button
              className={buttonClasses}
              onClick={(e) => routeChange(data.id, e)}
            >
              Edit
            </button>

            <button
              className={favButtonClasses}
              onClick={(e) => handleClick(data.id, e)}
            >
              Favorite Event
            </button>
          </div>
        );
      })}
    </div>
  );
}

function EventList() {
  const [eventColumns, setEventList] = useState([], [], []);
  const [token] = useToken();
  const { id } = useParams();
  const [accountId, setAccountId] = useState(null);
  const [pressedFav, setPressedFav] = useState(0);

  useEffect(() => {
    const url = `${process.env.REACT_APP_EVENTS_HOST}/api/events`;
    async function fetchData() {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const eventColumns = [[], [], []];
        let i = 0;
        for (const event of data) {
          if (event.chef_id === Number(id)) {
            eventColumns[i].push(event);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          }
        }
        setEventList(eventColumns);
      }
    }
    if (token) {
      async function fetchToken() {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
        const fetchConfig = {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          const data = await response.json();
          setAccountId(data.account.id);
        }
      }
      fetchToken();
    }
    fetchData();
    console.log(pressedFav);
  }, [id, token, pressedFav]);

  return (
    <div className="container">
      <h2 className="text-center my-4">Events</h2>
      <div className="row">
        {eventColumns.map((eventList, index) => {
          return (
            <EventColumn
              key={index}
              list={eventList}
              accountId={accountId}
              id={id}
              token={token}
              pressedFav={pressedFav}
              setPressedFav={setPressedFav}
            />
          );
        })}
      </div>
    </div>
  );
}

export default EventList;

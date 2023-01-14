import { useEffect, useState } from "react";

function EventColumn(props) {
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
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EventList() {
  const [eventColumns, setEventList] = useState([], [], []);

  useEffect(() => {
    const url = "http://localhost:8001/events";
    async function fetchData() {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const eventColumns = [[], [], []];
        let i = 0;
        for (const event of data) {
          eventColumns[i].push(event);
          i = i + 1;
          if (i > 2) {
            i = 0;
          }
        }
        setEventList(eventColumns);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-4">Events</h2>
      <div className="row">
        {eventColumns.map((eventList, index) => {
          return <EventColumn key={index} list={eventList} />;
        })}
      </div>
    </div>
  );
}

export default EventList;

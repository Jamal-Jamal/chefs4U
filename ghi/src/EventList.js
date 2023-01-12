import { useEffect, useState } from "react";

const dummyEventList = {
  events: [
    {
      id: 1,
      venue: "LA",
      address: "1523 Way",
      picture_url:
        "https://media.gettyimages.com/id/478821794/photo/skyscrapers-of-los-angeles-skyline-architecture-urban-cityscape.jpg?s=612x612&w=gi&k=20&c=U6nJ6S2LdKNEurOJV2p86FMFBKoU5FAKSHgFgecYMwY=",
      description:
        "This is a very long description for testing. COPY PASTE This is a very long description for testing. COPY PASTE This is a very long description for testing. COPY PASTE This is a very long description for testing. COPY PASTE",
      date: "1/5/23",
      time: "3:00 pm",
    },
    {
      id: 2,
      venue: "Houston",
      address: "1523 Way Street",
      picture_url: "picture.com",
      description: "This is a cooler event!",
    },
    {
      id: 3,
      venue: "New York",
      address: "1523 West Blvd",
      picture_url: "picture.com",
      description: "This is the coolest event!",
    },
    {
      id: 4,
      venue: "New York",
      address: "1523 West Blvd",
      picture_url: "picture.com",
      description: "This is the coolest event!",
    },
    {
      id: 5,
      venue: "New York",
      address: "1523 West Blvd",
      picture_url: "picture.com",
      description: "This is the coolest event!",
    },
  ],
};

function EventColumn(props) {
  return (
    <div className="col">
      {props.list.map((data, index) => {
        return (
          <div key={index} className="card mb-3 shadow">
            <div className="card shadow">
              <img
                src={data.picture_url}
                className="card-img-top"
                width="1"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{data.venue}</h5>
                <p className="card-text">
                  Time: {data.date} {data.time}
                </p>
                <p className="card-text">Address: {data.address}</p>
                <p className="card-text">Description: {data.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// function createEventCard(event) {
//   return (
//     <div className="col-4" key={event.id}>
//       <div className="card shadow">
//         <img
//           src={event.picture_url}
//           className="card-img-top"
//           width="1"
//           alt="..."
//         />
//         <div className="card-body">
//           <h5 className="card-title">{event.venue}</h5>
//           <p className="card-text">
//             Time: {event.date} {event.time}
//           </p>
//           <p className="card-text">Address: {event.address}</p>
//           <p className="card-text">Description: {event.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

function EventList() {
  const [eventColumns, setEventList] = useState([], [], []);

  useEffect(() => {
    // const url = "http://localhost:8001/events";
    // async function fetchData() {
    //   const response = await fetch(url);
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log(data);
    //     setEventList(data.events);
    //   }
    // }
    // TODO: wait for backend to be implemented, then make GET event list here
    const events = dummyEventList.events;
    const eventColumns = [[], [], []];
    // console.log(events);
    let i = 0;
    for (const event of events) {
      eventColumns[i].push(event);
      i = i + 1;
      if (i > 2) {
        i = 0;
      }
    }
    setEventList(eventColumns);
    // setEventList(dummyEventList.events);
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

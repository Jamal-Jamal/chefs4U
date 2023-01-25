import { useEffect, useState } from "react";

function ChefColumn({ list }) {
  return (
    <div className="col">
      {list.map((data, index) => {
        return (
          <div key={index} className="card mb-3 shadow">
            <img src={data.picture_url} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{data.name}</h5>
              <p className="card-text"></p>
              <p className="card-text">Cuisine: {data.cuisine}</p>
              <p className="card-text">
                Years of Experience: {data.years_of_experience}
              </p>
              <p className="card-text">Hourly Rate: {data.pay_rate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChefList() {
  const [chefs, setChefList] = useState([], [], []);

  useEffect(() => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts`;
    async function fetchData() {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const chefColumns = [[], [], []];
        let i = 0;
        for (const chef of data) {
          if (chef.is_chef === true) {
            chefColumns[i].push(chef);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          }
          setChefList(chefColumns);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-3">Chefs</h2>
      <div className="row">
        {chefs.map((allChefs, index) => {
          return <ChefColumn key={index} list={allChefs} />;
        })}
      </div>
    </div>
  );
}

export default ChefList;

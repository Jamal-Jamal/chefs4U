import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ChefColumn({ list }) {
  return (
    <div className="col">
      {list.map((data, index) => {
        return (
          <div key={data.id} className="card mb-3 shadow">
            <Link to={`/chef/${data.id}`}>
              <img src={data.picture_url} className="card-img-top" alt="..." />
            </Link>
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
  const [filters, setFilters] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState("");

  useEffect(() => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts`;
    async function fetchData() {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const chefColumns = [[], [], []];
        let i = 0;
        const chefFilters = [];
        for (const chefData of data) {
          if (
            chefFilters.indexOf(chefData.cuisine) === -1 &&
            chefData.is_chef
          ) {
            chefFilters.push(chefData.cuisine);
          }
        }
        setFilters(chefFilters);
        for (const chef of data) {
          if (cuisineFilter.length > 0) {
            if (chef.is_chef === true && chef.cuisine === cuisineFilter) {
              chefColumns[i].push(chef);
              i = i + 1;
              if (i > 2) {
                i = 0;
              }
            }
          } else if (chef.is_chef === true) {
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
  }, [cuisineFilter]);

  return (
    <div className="container">
      <h2 className="text-center my-4">Chefs</h2>
      <h5 className="text-center my-4">Filter By Cuisine</h5>
      <div className="mb-3">
        <select
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
          required
          name="cuisine"
          id="cuisine"
          className="form-select"
        >
          <option value="">All Cuisines</option>
          {filters.map((cuisine) => {
            return (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            );
          })}
        </select>
      </div>
      <div className="row">
        {chefs.map((allChefs, index) => {
          return <ChefColumn key={index} list={allChefs} />;
        })}
      </div>
    </div>
  );
}

export default ChefList;

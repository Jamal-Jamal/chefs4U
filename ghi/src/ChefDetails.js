import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ChefDetails(props) {
  const { id } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/chef/${id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    }
    fetchProfile();
  }, [id]);

  return (
    <>
      <div className="card my-3 shadow">
        <img
          src={profile.picture_url}
          className="card-img-top max-width"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{profile.name}</h5>
          <p className="card-text">Cuisine: {profile.cuisine}</p>
          <p className="card-text">
            Years of experience: {profile.years_of_experience}
          </p>
          <p className="card-text">Rate: {profile.pay_rate}</p>
        </div>
      </div>
    </>
  );
}

export default ChefDetails;

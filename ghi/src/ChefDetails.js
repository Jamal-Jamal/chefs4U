import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useToken } from "./Accounts/Authentication";

function ChefDetails(props) {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const [buttonClasses, setButtonClasses] = useState("btn btn-info d-none");
  const [token] = useToken();

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
          if (data.account.id === Number(id)) {
            setButtonClasses("btn btn-info");
          }
        }
      }
      fetchToken();
    }
  }, [token, id]);

  function handleClick() {
    navigate(`/chef/${id}/edit`);
  }

  return (
    <>
      <div className="card my-3 shadow">
        <div className="container my-3">
          <div className="row">
            <div className="col-sm">
              <img
                src={profile.picture_url}
                className="card-img-top max-width"
                alt="..."
              />
            </div>
            <div className="col-sm">
              <div className="card-body">
                <h3 className="card-title">{profile.name}</h3>
                <p className="card-text">Cuisine: {profile.cuisine}</p>
                <p className="card-text">
                  Years of experience: {profile.years_of_experience}
                </p>
                <p className="card-text">Hourly Rate: {profile.pay_rate}</p>
                <Button
                  variant="primary"
                  className={buttonClasses}
                  onClick={handleClick}
                >
                  Edit Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChefDetails;

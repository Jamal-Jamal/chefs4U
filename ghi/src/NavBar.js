import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "./Accounts/Authentication.js";

function NavBar() {
  const [token] = useToken();
  const [loginClasses, setLoginClasses] = useState("nav-link");
  const [accountId, setAccountId] = useState(null);
  useEffect(() => {
    if (token) {
      setLoginClasses("nav-link d-none");
      async function fetchToken() {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token/`;
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
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Chefs4U
        </NavLink>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink
            className="nav-link"
            aria-current="page"
            to="/"
            >
            View Chefs
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" aria-current="page" to="add-event">
              Add An Event
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="events/favorites"
            >
              Favorite Events
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={loginClasses}
              aria-current="page"
              to={`chef/${accountId}}`}
            >
              My Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={loginClasses} aria-current="page" to="login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={loginClasses} aria-current="page" to="signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

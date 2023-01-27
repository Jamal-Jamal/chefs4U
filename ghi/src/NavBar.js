import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useToken } from "./Accounts/Authentication.js";

function NavBar() {
  const token = useToken()[0];
  const logout = useToken()[2];
  const [accountId, setAccountId] = useState(null);
  const [isChef, setIsChef] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
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
          setIsChef(data.account.is_chef);
        }
      }
      fetchToken();
    } else {
      setLoggedIn(false);
    }
  }, [token, loggedIn]);

  function handleLogout() {
    logout();
    setAccountId(null);
    setIsChef(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Chefs4U
        </NavLink>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-2">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">
              View Chefs
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
              className={isChef ? "nav-link" : "nav-link d-none"}
              aria-current="page"
              to="add-event"
            >
              Add An Event
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={isChef ? "nav-link" : "nav-link d-none"}
              aria-current="page"
              to={`chef/${accountId}`}
            >
              My Profile
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item mx-auto">
            <NavLink
              className={loggedIn ? "nav-link d-none" : "nav-link"}
              aria-current="page"
              to="login"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={loggedIn ? "nav-link d-none" : "nav-link"}
              aria-current="page"
              to="signup"
            >
              Sign Up
            </NavLink>
          </li>
          <li className="nav-item">
            <Link
              className={loggedIn ? "nav-link" : "nav-link d-none"}
              aria-current="page"
              to="/"
              onClick={handleLogout}
            >
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Chefs4U
        </NavLink>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="events">
              Events
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

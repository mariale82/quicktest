import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

const Navigation = () => {
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const { name } = user;
  const [rol, setRol] = useState("Coordinador");

  useEffect(() => {
    console.log("user", user);
    if (user.nickname !== "male") {
      setRol("Coordinador");
    } else {
      setRol("Administrador");
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {isAuthenticated
        ? console.log("hola ", user)
        : console.log("Quien eres tu")}
      <img
        src="https://assets.quick.com.co/images/logos/quick-square-quick.svg?fh=ghf341"
        style={{ height: "40px" }}
      ></img>
      <Link className="navbar-brand" to="/">
        Olimpiadas
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {rol !== "Coordinador" ? (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/listado">
                Listado
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categoria">
                Categorias
              </Link>
            </li>
            <li className="nav-item">
              <LogoutButton />
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <LogoutButton />
            </li>
          </ul>
        )}

        <form className="form-inline my-2 my-lg-0">
          <span className="profile">
            <h5>{name}</h5>
            <small>{rol}</small>
          </span>
          <Link to="/profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSIltE7CNXgJ95jKIkczNnzcVEbiox9t0c-sg&usqp=CAU"
              alt="Profile"
              to="/profile"
              style={{ width: "60px", height: "60px" }}
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          </Link>
          {/* <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSIltE7CNXgJ95jKIkczNnzcVEbiox9t0c-sg&usqp=CAU"
            alt="Profile"
            to="/profile"
            style={{ width: "60px", height: "60px" }}
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          /> */}
        </form>
      </div>
    </nav>
  );
};
export default withAuthenticationRequired(Navigation);
// export default Navigation;

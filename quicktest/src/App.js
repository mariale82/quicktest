import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Info from "./components/info";
import Categoria from "./components/categoria";
import Mantenimiento from "./components/mantenimiento";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";

library.add(faMedal);
// function App() {

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    console.log("Loading");
  }
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        {/* {name === "male" ? (
          <Route exact path="/" component={Mantenimiento} />
        ) : (
          <Route exact path="/" component={Info} />
        )} */}
        <Route exact path="/" component={Mantenimiento} />
        <Route exact path="/listado" component={Info} />
        <Route exact path="/categoria" component={Categoria} />
        <Route exact path="/mantenimiento" component={Mantenimiento} />
        <Route exact path="/profile" component={Profile} />
      </div>
    </Router>
  );
};

export default App;

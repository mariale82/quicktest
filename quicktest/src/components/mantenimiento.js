import React, { useState, useEffect } from "react";
import unnamed from "../assets/unnamed.jpg";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Mantenimiento() {
  const { user } = useAuth0();
  const [view, setView] = useState(true);

  useEffect(() => {
    console.log("user", user);
    if (user.nickname !== "male") {
      console.log("true");
      setView(true);
    } else {
      console.log("false");
      setView(false);
    }
  }, []);

  return (
    <div>
      {view ? (
        <img
          src={unnamed}
          alt="logo"
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <img
          src=" https://static.vecteezy.com/system/resources/thumbnails/000/371/208/small/1465.jpg"
          alt="logo"
          style={{ width: "100%", height: "auto" }}
        />
      )}
    </div>
  );
}

export default withAuthenticationRequired(Mantenimiento);

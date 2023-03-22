import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./App.css";

const App = () => {
  const [user, setUser] = useState({});

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID Token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  };

  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "299101999212-rn570badm591vpupvnp7hrgh109hgqp2.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture} alt="" />
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
};

export default App;

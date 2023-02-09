import "./signup.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newscheck, setNewscheck] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.includes("@")) {
      if (username && email && password) {
        let formSend = {
          email: email,
          username: username,
          password: password,
          newsletter: newscheck,
        };

        const response = await axios.post(
          `https://lereacteur-vinted-api.herokuapp.com/user/signup`,
          formSend
        );
        // console.log(response.data._id);
        Cookies.set(response.data._id, response.data.token);
        alert("submited 🧏‍♂️");
      }
    } else {
      alert("Please use a real email adress");
    }
  };

  return (
    <div className="signup-container">
      <h1>S'inscrire</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          value={username}
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          value={email}
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="checkbox-container">
          <div className="checkbox-display">
            <label>
              <input
                value={newscheck}
                type="checkbox"
                onChange={() => {
                  setNewscheck(!newscheck);
                }}
              />
              S'inscrire à notre newsletter
            </label>
          </div>
          <span className="check-desc">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </span>
        </div>
        <button type="submit">Je m'inscris</button>
      </form>
      {/* <Link>Tu as déjà un compte ? Connecte-toi :)</Link> */}
    </div>
  );
};

export default SignUp;

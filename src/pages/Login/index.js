import "./login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.get("token") && navigate("/");
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (email && password) {
        let formSend = {
          email: email,
          password: password,
        };

        const response = await axios.post(
          `https://lereacteur-vinted-api.herokuapp.com/user/login`,
          formSend
        );
        Cookies.set("token", response.data.token);
        alert("connection réussie");
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Se connecter</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          value={email}
          type="text"
          placeholder="Adresse email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          value={password}
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button>Se connecter</button>
      </form>
      <Link className="login-link" to={"/signup"}>
        Pas de compte ..? Inscris-toi ! 😎
      </Link>
    </div>
  );
};
export default Login;
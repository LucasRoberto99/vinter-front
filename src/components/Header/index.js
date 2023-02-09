import { Link } from "react-router-dom";
import logo from "../../pics/vinted-logo.jpg";
import "./header.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  // juste pour actualiser ^^
  // const [noToken, setNoToken] = useState(false);

  return (
    <header>
      <div className="header">
        <Link to="/">
          <img className="header-pic" src={logo} alt="logo-vinted" />
        </Link>

        <input
          className="search-bar"
          type="text"
          placeholder="Cherchez des articles"
        />
        {!Cookies.get("token") ? (
          <div className="button-blanc">
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Se connecter
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              Cookies.remove("token");
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        )}

        <button className="button-vend">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;

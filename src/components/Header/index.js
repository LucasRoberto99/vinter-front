import { Link } from "react-router-dom";
import logo from "../../pics/vinted-logo.jpg";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="header">
        <Link to="/">
          <img className="header-pic" src={logo} alt="logo-vinted" />
        </Link>

        <input type="text" placeholder="Cherchez des articles" />
        <div className="button-blanc">
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            S'inscrire
          </button>
          <button>Se connecter</button>
        </div>
        <button className="button-vend">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;

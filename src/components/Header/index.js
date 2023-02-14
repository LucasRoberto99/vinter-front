import { Link } from "react-router-dom";
import logo from "../../pics/vinted-logo.jpg";
import "./header.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SignupModal from "../SignupModal/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Range } from "react-range";

// import { useState } from "react";

const Header = ({
  signupModal,
  setSignupModal,
  querySearch,
  setQuerySearch,
  sort,
  setSort,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  priceSearchBar,
}) => {
  const navigate = useNavigate();
  // juste pour actualiser ^^
  // const [noToken, setNoToken] = useState(false);

  return (
    <div>
      <header>
        <div className="header">
          <Link to="/">
            <img className="header-pic" src={logo} alt="logo-vinted" />
          </Link>
          <div className="middle-header">
            <div className="search-loupe">
              <input
                value={querySearch}
                className="search-bar"
                type="text"
                placeholder="Cherchez des articles"
                onChange={(event) => {
                  setQuerySearch(event.target.value);
                }}
              />
              <FontAwesomeIcon className="loupe" icon="magnifying-glass" />
            </div>
            {priceSearchBar ? (
              <div className="set-price-search-bar">
                <div className="toggle">
                  <span>Trier par prix</span>
                  <Toggle
                    className="toggle-button"
                    defaultChecked={false}
                    icons={{
                      checked: <FontAwesomeIcon icon="arrow-down" />,
                      unchecked: <FontAwesomeIcon icon="arrow-up" />,
                    }}
                    onChange={() => {
                      sort === "desc" ? setSort("asc") : setSort("desc");
                    }}
                  />
                </div>
                <div>
                  {/* A TOUT LECTEUR SACHEZ QUE CE QUI SUIT M'EST QUASI INCOMPREHENSIBLE D'OU LA NON COLORATION ET LE FAIT QUE LES MIN MAX NE SUIVENT PAS LES BOUTONS */}
                  <Range
                    step={5}
                    min={0}
                    max={500}
                    values={[priceMin, priceMax]}
                    onChange={(values) => {
                      // console.log(values);
                      setPriceMin(values[0]);
                      setPriceMax(values[1]);
                    }}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "6px",
                          width: "200px",
                          borderRadius: "8px",
                          backgroundColor: ["lightgrey"],
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "22px",
                          width: "22px",
                          borderRadius: "100%",
                          backgroundColor: "#999",
                        }}
                      />
                    )}
                  />
                  <div className="outputs">
                    <output className="output-min">{priceMin}</output>
                    <output className="output-max">{priceMax}</output>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {!Cookies.get("token") ? (
            <div className="button-blanc">
              <button
                onClick={() => {
                  navigate("/");
                  setSignupModal(true);
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
              className="header-logout"
              onClick={() => {
                Cookies.remove("token");
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
          )}

          <button
            className="button-vend"
            onClick={() => {
              Cookies.get("token") ? navigate("/publish") : navigate("/login");
            }}
          >
            Vends tes articles
          </button>
        </div>
      </header>
      {signupModal ? (
        <SignupModal
          signupModal={signupModal}
          setSignupModal={setSignupModal}
        />
      ) : null}
    </div>
  );
};

export default Header;

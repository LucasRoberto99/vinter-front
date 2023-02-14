import "./signupModal.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupModal = ({ setSignupModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [newscheck, setNewscheck] = useState(false);
  //   const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (email.includes("@")) {
        if (username && email && password) {
          const formData = new FormData();
          formData.append("email", email);
          formData.append("username", username);
          formData.append("password", password);
          formData.append("newsletter", newscheck);
          formData.append("avatar", avatar);

          const response = await axios.post(
            `http://localhost:4000/user/signup`,
            formData
          );
          console.log(username);
          Cookies.set("token", response.data.token);
          alert("submited 🧏‍♂️");
          setSignupModal(false);
        }
      } else {
        alert("Please use a real email adress");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="sign-modal-bgc">
      <div className="signup-modal-container">
        <span
          className="closing-x"
          onClick={() => {
            setSignupModal(false);
          }}
        >
          ❌
        </span>
        <h1 className="signup-modal-h1">S'inscrire</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            value={username}
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <div className="avatar-selector">
            <label>
              <div className="addpic-div">
                <FontAwesomeIcon className="plus-icon" icon="plus" />
                <span className="addpic-avatar">
                  Ajoutez une photo de profil
                </span>
              </div>
              <input
                id="avatar-input"
                className="avatar-input"
                type="file"
                onChange={(event) => {
                  setAvatar(event.target.files[0]);
                  console.log(avatar);
                }}
              />
              {avatar && <div>{avatar.name}</div>}
            </label>
          </div>
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
                S'inscrire à notre newsletter 📩
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
        <Link
          onClick={() => {
            setSignupModal(false);
          }}
          className="signup-link"
          to={"/login"}
        >
          Tu as déjà un compte ? Connecte-toi 😄
        </Link>
      </div>
    </div>
  );
};

export default SignupModal;

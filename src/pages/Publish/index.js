import "./publish.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Publish = ({ setPriceSearchBar }) => {
  const [infos, setInfos] = useState({
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    condition: "",
    city: "",
    price: 0.0,
    picture: "",
  });

  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    !token && navigate("/login");
    setPriceSearchBar(false);
  }, [setPriceSearchBar, navigate, token]);

  return (
    <div className="publish-body">
      <div className="margin-publish">
        <h1 className="publish-title">Vends ton article</h1>
        <form
          className="publish-form"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const formData = new FormData();
              const infoKeys = Object.keys(infos);
              // console.log(infoKeys);
              for (let i = 0; i < infoKeys.length; i++) {
                if (infos[infoKeys[i]]) {
                  formData.append(infoKeys[i], infos[infoKeys[i]]);
                  //   console.log(infos);
                }
              }
              await axios.post(
                "http://localhost:4000/offer/publish",
                formData,
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              // console.log(response);
              alert("Article ajouté ✅");
              navigate("/");
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          <div className="label-publish">
            <label className="label-middle-align">
              <div className="input-design">
                <FontAwesomeIcon className="plus-icon" icon="plus" /> Ajoutez
                une photo
              </div>
              <input
                type="file"
                className="input-publish"
                placeholder="Ajoute une photo "
                onChange={(event) => {
                  const newInfos = { ...infos };
                  newInfos.picture = event.target.files[0];
                  setInfos(newInfos);
                }}
              />
              {infos.picture ? (
                <img
                  className="img-in-label"
                  src={URL.createObjectURL(infos.picture)}
                  alt=""
                />
              ) : null}
            </label>
          </div>
          <div className="title-name-div">
            <div className="title-div">
              <div>Titre</div>
              <input
                value={infos.title}
                type="text"
                placeholder="ex: Polo Lacoste rouge"
                onChange={(event) => {
                  const newInfos = { ...infos };
                  newInfos.title = event.target.value;
                  setInfos(newInfos);
                }}
              />
            </div>
            <div className="title-div">
              <div>Décris ton article</div>
              <input
                value={infos.description}
                type="text"
                placeholder="ex: porté a de rares occasions"
                onChange={(event) => {
                  const newInfos = { ...infos };
                  newInfos.description = event.target.value;
                  setInfos(newInfos);
                }}
              />
            </div>
          </div>
          <div className="title-name-div">
            <div className="title-div">
              <div>Marque</div>
              <input
                value={infos.brand}
                type="text"
                placeholder="ex: Lacoste"
                onChange={(event) => {
                  const newInfos = { ...infos };
                  newInfos.brand = event.target.value;
                  setInfos(newInfos);
                }}
              />
            </div>
            <div className="title-div">
              <div>Taille</div>
              <input
                value={infos.size}
                type="text"
                placeholder="ex: M"
                onChange={(event) => {
                  const newInfos = { ...infos };
                  newInfos.size = event.target.value;
                  setInfos(newInfos);
                }}
              />
            </div>
            <div className="title-div">
              <div>Couleur</div>
              <input
                value={infos.color}
                type="text"
                placeholder="ex: Rouge"
                onChange={(event) => {
                  const newInfos = { ...infos };
                  newInfos.color = event.target.value;
                  setInfos(newInfos);
                }}
              />
            </div>
            <div className="title-div">
              <div>Etat</div>
              <input
                value={infos.condition}
                type="text"
                placeholder="ex: Très bon"
                onChange={(event) => {
                  const newInfos = { ...infos };
                  newInfos.condition = event.target.value;
                  setInfos(newInfos);
                }}
              />
            </div>
            <div className="title-div">
              <div>Lieu</div>
              <input
                value={infos.city}
                type="text"
                placeholder="ex: Paris"
                onChange={(event) => {
                  const newInfos = { ...infos };
                  newInfos.city = event.target.value;
                  setInfos(newInfos);
                }}
              />
            </div>
          </div>
          <div className="title-name-div">
            <div className="title-div">
              <div>Prix</div>
              <input
                value={infos.price}
                type="number"
                placeholder="0.00€"
                onChange={(event) => {
                  const newInfos = { ...infos };
                  newInfos.price = event.target.value;
                  setInfos(newInfos);
                }}
              />
            </div>

            <div className="checkbox-publish">
              <input
                value={infos.checked}
                type="checkbox"
                onChange={(event) => {
                  const newInfos = { ...infos };
                  newInfos.checked
                    ? (newInfos.checked = !newInfos.checked)
                    : (newInfos.checked = true);
                  setInfos(newInfos);
                }}
              />
              <div>Je suis intéressé(e)par les échanges</div>
            </div>
          </div>
          <div className="div-publish-button">
            <button className="publish-button">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publish;

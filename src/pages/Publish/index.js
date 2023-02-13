import "./publish.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [infos, setInfos] = useState({});

  return (
    <div>
      <h1>Vends ton article</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const formData = new FormData();
            const infoKeys = Object.keys(infos);
            for (let i = 0; i < infoKeys.length; i++) {
              if (infos.infoKeys[i]) {
                // formData.append(infoKeys[i], infos.infoKeys[i]);
                console.log(infos);
              }
            }
            console.log(formData);
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <div>
          <input type="file" placeholder="Ajoute une photo " />
        </div>
        <div>
          <div>
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
          <div>
            <div>Décris ton article</div>
            <input
              value={infos.desc}
              type="text"
              placeholder="ex: porté a de rares occasions"
              onChange={(event) => {
                const newInfos = { ...infos };
                newInfos.desc = event.target.value;
                setInfos(newInfos);
              }}
            />
          </div>
        </div>
        <div>
          <div>
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
          <div>
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
          <div>
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
          <div>
            <div>Etat</div>
            <input
              value={infos.state}
              type="text"
              placeholder="ex: Très bon"
              onChange={(event) => {
                const newInfos = { ...infos };
                newInfos.state = event.target.value;
                setInfos(newInfos);
              }}
            />
          </div>
          <div>
            <div>Lieu</div>
            <input
              value={infos.location}
              type="text"
              placeholder="ex: Paris"
              onChange={(event) => {
                const newInfos = { ...infos };
                newInfos.location = event.target.value;
                setInfos(newInfos);
              }}
            />
          </div>
        </div>
        <div>
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
          <div>
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

        <button>Ajouter</button>
      </form>
    </div>
  );
};

export default Publish;

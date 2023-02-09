import "./offer.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <span>Chargement ...</span>
  ) : (
    <div className="offer-body">
      <div className="offer-article">
        <img
          className="offer-pic"
          src={data.product_pictures[0].url}
          alt="offerPic"
        />
        <div className="offer-white">
          <div className="offer-white-top">
            <span>{data.product_price.toFixed(2)} €</span>
            {data.product_details.map((detail, index) => {
              const key = Object.keys(detail)[0];

              return (
                <div className="offer-div" key={index}>
                  <span className="offer-span offer-title">
                    {key.toUpperCase()}
                  </span>
                  <span className="offer-span">{detail[key]}</span>
                </div>
              );
            })}
          </div>
          <div className="offer-white-bottom">
            <span>{data.product_name}</span>
            <span>{data.product_description}</span>
            <span className="offer-user">
              {data.owner.account.avatar ? (
                <img
                  className="avatar-pic"
                  src={data.owner.account.avatar.url}
                  alt="avatarpic"
                />
              ) : (
                ""
              )}{" "}
              {data.owner.account.username}
            </span>{" "}
            <button className="offer-button">Acheter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;

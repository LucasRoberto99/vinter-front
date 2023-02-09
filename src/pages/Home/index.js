import hero from "../../pics/hero.jpg";
import "./home.css";
import Article from "../../components/Article";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  // const { data } = useParams();
  // console.log(data);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>Chargement ...</span>
  ) : (
    <div className="home-page">
      <div className="banner">
        <div>
          <img className="hero-banner" src={hero} alt="hero-banner" />
        </div>
        <div className="margin-banner">
          <div className="hero-ready">
            <div className="hero-title">
              Prêts à faire du tri dans vos placards ?
            </div>
            <button className="hero-button">Commencer à vendre</button>
          </div>
        </div>
      </div>
      <div className="main">
        {data.offers.map((offer) => {
          return <Article offer={offer} key={offer._id} />;
        })}
      </div>
    </div>
  );
};

export default Home;

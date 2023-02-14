import hero from "../../pics/hero.jpg";
import "./home.css";
import Article from "../../components/Article";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = ({
  querySearch,
  sort,
  priceMin,
  priceMax,
  // priceSearchBar,
  setPriceSearchBar,
}) => {
  // const { data } = useParams();
  // console.log(data);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/offers?page=${page}&limit=10&title=${querySearch}&sort=${sort}&priceMin=${priceMin}&priceMax=${priceMax}`
      );
      // console.log(response.data.offers);
      setData(response.data);
      setIsLoading(false);
      setMaxPage(Math.ceil(response.data.count / 10));
      setPriceSearchBar(true);
    };
    fetchData();
  }, [page, querySearch, sort, priceMax, priceMin, setPriceSearchBar]);

  return isLoading ? (
    <span>Chargement ...</span>
  ) : (
    <>
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
      <div className="footer">
        <div>{page - 1 > 1 ? <span>...</span> : null}</div>
        <div>
          {" "}
          {page - 1 > 0 ? (
            <span
              onClick={() => {
                window.scrollTo(0, 0);
                setPage(page - 1);
              }}
            >
              {page - 1}
            </span>
          ) : null}
        </div>
        <div>
          <span className="page">{page}</span>
        </div>
        <div>
          {page < maxPage ? (
            <span
              onClick={() => {
                window.scrollTo(0, 0);
                setPage(page + 1);
              }}
            >
              {page + 1}
            </span>
          ) : null}
        </div>
        <div>{page + 2 <= maxPage ? <span>...</span> : null}</div>
      </div>
    </>
  );
};

export default Home;

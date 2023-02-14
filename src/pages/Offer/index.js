import "./offer.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Offer = ({ setPriceSearchBar }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--vinted-backend--fhx5w78hhgzd.code.run/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
      setPriceSearchBar(false);
    };

    fetchData();
  }, [id, setPriceSearchBar]);
  // console.log(data._id);
  return isLoading ? (
    <span>Chargement ...</span>
  ) : (
    <div className="offer-body">
      <div className="offer-article">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className="left-pic"
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {/* {data.product_picture.map((pic, index) => { */}
          {/* return ( */}
          <img
            className="left-pic-img"
            // src={pic.url}
            src={data.product_picture.secure_url}
            // alt={`offerpic${index}`}
            alt="imgdeloffre"
            // key={index}
          />
          {/* ); */}
          {/* })} */}
        </Carousel>

        <div className="offer-white">
          <div className="offer-white-top">
            <span>{data.product_price.toFixed(2)} €</span>
            {data.product_details.map((detail, index) => {
              const key = Object.keys(detail)[0];

              return (
                <div className="offer-div" key={index}>
                  <span className="offer-span offer-title">{key}</span>
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
            </span>
            <button
              className="offer-button"
              onClick={() => {
                Cookies.get("token")
                  ? navigate("/payement", {
                      state: {
                        id: data._id,
                        price: data.product_price,
                        description: data.product_description,
                        title: data.product_name,
                      },
                    })
                  : navigate("/login");
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;

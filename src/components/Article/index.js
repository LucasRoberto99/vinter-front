import "./article.css";
import { Link } from "react-router-dom";

const Article = ({ offer }) => {
  // console.log(offer);
  // console.log(offer);
  const profile = offer.owner.account.username;
  const articlePicUrl = offer.product_picture.url;
  const price = offer.product_price;
  const productDetails = offer.product_details;
  const id = offer._id;

  const size = productDetails[1].TAILLE;
  const brand = productDetails[0].MARQUE;

  return (
    <Link href="#top" className="article-link" to={`/offer/${id}`}>
      <div className="article">
        <div className="article-profile">
          {offer.owner.account.avatar ? (
            <img
              className="avatar-pic"
              src={offer.owner.account.avatar.url}
              alt="avatarpic"
            />
          ) : (
            ""
          )}
          <span className="article-user">{profile}</span>
        </div>
        <div className="article-pic">
          <img src={articlePicUrl} alt="article-pic" />
        </div>
        <div className="price-size-brand">
          <div>{price.toFixed(2)} €</div>
          <div>{size}</div>
          <div>{brand}</div>
        </div>
      </div>
    </Link>
  );
};

export default Article;

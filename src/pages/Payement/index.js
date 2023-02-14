import "./payement.css";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51MbRAjDzVo2gj2qxUoIugll93zGkGHsZPvmvUXaYhgMx9bV5uPf420VwTPoHqkBKkDrHGfpnc3jTFGVILsHMwoad00wygaqM5E"
);

const Payement = ({ setPriceSearchBar }) => {
  useEffect(() => {
    setPriceSearchBar(false);
  }, [setPriceSearchBar]);

  const location = useLocation();

  const { id, price, description, title } = location.state;

  // console.log(id);

  return (
    <main className="main-pay">
      <div className="div-white-pay">
        <div className="title-pay">Résumé de la commande</div>
        <div>
          <div>
            <div>Commande</div>
            <div>{price.toFixed(2)}</div>
          </div>
          <div>
            <div>Frais de protection acheteurs</div>
            <div>0,40€</div>
          </div>
          <div>
            <div>Frais de port</div>
            <div>8,00€</div>
          </div>
        </div>
      </div>
      <div className="div-white-pay">
        <div>
          <div>Total</div>
          <div>{(price + 8.4).toFixed(2)}</div>
        </div>
        <div>
          {`Il ne vous reste plus qu'une étape pour vous offrir ${title}. Vous allez
          payer ${(price + 8.4).toFixed(
            2
          )}€ (frais de port et protection inclus)`}
        </div>
      </div>
      <div className="div-white-pay">
        <Elements stripe={stripePromise}>
          <CheckoutForm id={id} price={price} description={description} />
        </Elements>
      </div>
    </main>
  );
};

export default Payement;

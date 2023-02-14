import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import axios from "axios";

// import { useState } from "react";

const CheckoutForm = ({ id, price, description }) => {
  const stripe = useStripe();

  const elements = useElements();

  //   console.log(id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = Cookies.get("token");

    try {
      const cardElement = elements.getElement(CardElement);
      //   console.log(cardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "id acheteur",
      });

      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken);
      const response = await axios.post(
        "https://site--vinted-backend--fhx5w78hhgzd.code.run/pay",
        {
          stripeToken: stripeToken,
          price: price,
          id: id,
          description: description,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Payer</button>
    </form>
  );
};

export default CheckoutForm;

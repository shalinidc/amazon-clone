import React, {useEffect, useState} from 'react';
import '../css/Payment.css'
import {useStateValue} from "../context/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import {Link} from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {getBasketTotal} from "../context/reducer";
import CurrencyFormat from "react-currency-format";
import axios from "axios";

const Payment = () => {

  const [{basket,user}, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSuceeded] = useState(false);
  const [processing, setProcessing] = useState("")
  const [clientSecret, setClientSecret] = useState(true);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
        });
      setClientSecret(response.data.clientSecret);
    }
    getClientSecret();
  })

  const handleSubmit = async (e) => {
    /*Fancy stripe stuff*/
    e.preventDefault();
    setProcessing(true);

    /*const payload = await stripe.confirmCardPayment(clientSecret), {
      payment_method: {
        card: elements.getElement(CardElement)
    }
    }*/
  }

  const handleChange = event => {
    //Listen for changes in the CardElement
    //and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

  return(
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout {<Link to='/checkout'> {basket?.length} items</Link>}
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>San Francisco, CA</p>
          </div>

        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map(item => <CheckoutProduct item={item}/>)}
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/*stripe magic*/}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>

              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => (
                    <h3> Order Total: {value} </h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"} </span>
                </button>
              </div>
              {/*Errors*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;
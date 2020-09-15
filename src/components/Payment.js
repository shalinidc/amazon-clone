import React from 'react';
import '../css/Payment.css'
import {useStateValue} from "../context/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import {Link} from 'react-router-dom';


const Payment = () => {

    const [{basket,user}, dispatch] = useStateValue();

    return(
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} items</Link>
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
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Payment;
import React, {forwardRef} from "react";
import "../css/Checkout.css"
import Subtotal from "./Subtotal";
import {useStateValue} from "../context/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { getUserName } from "../context/reducer";
import FlipMove from 'react-flip-move';

function Checkout() {

    const [{basket, user}, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423592668_.jpg" alt=""/>

                <div>
                    <h2 className='checkout__userName'>Hello, {getUserName(user)}</h2>
                    <h2 className="checkout__title">
                        Shopping Basket
                    </h2>
                    <FlipMove
                        staggerDurationBy="30"
                        duration={500}
                        typeName="ul"
                        easing="ease-out"
                        enterAnimation="accordionVertical"
                        leaveAnimation="accordionVertical"
                    >
                    {basket.map( (item, i) => <CheckoutProduct key={i} item={item}/>)}
                    </FlipMove>
                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout;
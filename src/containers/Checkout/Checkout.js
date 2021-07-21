import React, { useState } from 'react';
import CheckoutOrder from '../../components/Order/CheckoutOrder/CheckoutOrder';

const checkout = () => {
    const [ingredients, setState] = useState({
        cheese: 1,
        bacon: 1,
        meat: 1
    })
    return(
            <div>
                <CheckoutOrder ingredients={ingredients}/>
            </div>
        )
    }

export default checkout;

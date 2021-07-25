import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import CheckoutOrder from '../../components/Order/CheckoutOrder/CheckoutOrder';
import Contact from '../Checkout/Contact/Contact'
import { useWillMount } from '../../hoc/willMountHook/willMount';

const checkout = (props) => {
    const [stateValue, setState] = useState({
        ingredientObj: null,
        price: 0
    });

    // using custom willMount custom react hook for getting ingridents before render() 
    useWillMount(() => {
        const query = new URLSearchParams( props.location.search);  //bacon=1&cheese=1&meat=1&salad=1
        
        const ingredients = {};
        let totalPrice = 0;
        for ( let param of query.entries() ) {
            // ['salad', 1]
            if (param[0] === 'price') {
                totalPrice = +param[1];
            }
            else {
                ingredients[param[0]] = +param[1];  // updating the value of each key {a: 1, b: 2}
            }
            
        }
        setState({ingredientObj: ingredients, price: totalPrice})
    })

    const cancelHandler = () => {
        props.history.goBack();
    }

    const continueHandler = () => {
        props.history.replace('/checkout/contact')
    }
    return(
            <div>
                <CheckoutOrder ingredients={stateValue.ingredientObj} 
                    cancelled={cancelHandler} 
                    continue={continueHandler}/>
                <Route path={props.match.path + '/contact'} 
                    render={() => (<Contact ingredients={stateValue.ingredientObj} totalPrice={stateValue.price}/>)} />
            </div>
        )
    }

export default checkout;

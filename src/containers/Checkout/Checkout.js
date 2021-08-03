import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutOrder from '../../components/Order/CheckoutOrder/CheckoutOrder';
import Contact from '../Checkout/Contact/Contact'
import { resetIngredients } from '../../store/actions/order';
/* FOR REFERENCE. commented this after adding redux */
const checkout = (props) => {

    // using custom willMount custom react hook for getting ingridents before render() 
    // useWillMount(() => {
    //     const query = new URLSearchParams( props.location.search);  //bacon=1&cheese=1&meat=1&salad=1
        
    //     const ingredients = {};
    //     let totalPrice = 0;
    //     for ( let param of query.entries() ) {
    //         // ['salad', 1]
    //         if (param[0] === 'price') {
    //             totalPrice = +param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1];  // updating the value of each key {a: 1, b: 2}
    //         }
            
    //     }
    //     setState({ingredientObj: ingredients, price: totalPrice})
    // })

    const cancelHandler = () => {
        props.history.goBack();
        props.changePrice();
    }

    const continueHandler = () => {
        props.history.replace('/checkout/contact')
    }

    let summary;
    summary = <Redirect to="/" />

    if(props.ings) {
        summary = (
            <div>
            <CheckoutOrder ingredients={props.ings} 
                cancelled={cancelHandler} 
                continue={continueHandler}/>
            <Route path={props.match.path + '/contact'} 
                render={() => (<Contact />)} />
        </div>
        )
    }
    
    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        changePrice: () => dispatch(resetIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(checkout);

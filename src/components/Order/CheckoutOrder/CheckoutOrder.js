import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/button/Button';
import classes from './CheckoutOrder.css'

const checkoutOrder = (props) => {
    return (
        <div className={classes.CheckOutOrder}>
            <h2>We hope it tastes good!!</h2>
            <div style={{ width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Success" clicked={props.continue}>Continue</Button>
            <Button btnType="Danger" clicked={props.cancelled}>Cancel</Button>
        </div>
    )
}

export default checkoutOrder;
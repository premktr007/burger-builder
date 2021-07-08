import React from 'react';

import Aux from '../../../hoc/Auxi';
import Button from '../../UI/button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey} style={{marginBottom: '5px'}}> 
            <span style={{textTransform: 'capitalize'}}>{igKey}</span> :&nbsp; 
             {props.ingredients[igKey]}</li>
        );
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your delicious burger with following ingredients :</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Buger Price: <b>{props.price} INR</b></p>
            <Button btnType="Success" clicked={props.continue}>Continue</Button>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        </Aux>
    )
}

export default orderSummary;
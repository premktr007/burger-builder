import React, { Component } from 'react';

import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const prices = {
    meat: 50,
    bacon: 40,
    salad: 30,
    cheese: 20
}

export class BurgerBuilder extends Component {

    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0,
        },
        totalPrice: 60,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const updatedPrice = this.state.totalPrice + prices[type];

        this.setState({
            ingredients: updatedIngredients ,
            totalPrice: updatedPrice
        });
    }

    removeIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type];

            if(oldCount > 0) {
                const updatedCount = oldCount - 1;
            
                const updatedIngredients = { ...this.state.ingredients };   // state is immutuable so copying
                updatedIngredients[type] = updatedCount;
        
                const updatedPrice = this.state.totalPrice - prices[type];
        
                this.setState({
                    ingredients: updatedIngredients ,
                    totalPrice: updatedPrice
                });
            }
    }

    purchasingHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        alert('you continue!!')
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        // creating an object for disabling LESS button
        for(let key in disabledInfo) {
            disabledInfo[key] = this.state.ingredients[key] <= 0;
            // {salad: true, meat: false, bacon: true ..}
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} hide={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}
                    continue={this.purchaseContinueHandler}
                    cancel={this.purchaseCancelHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    purchasable={this.state.totalPrice <= 60}
                    purchasing={this.purchasingHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;
import React, { Component } from "react";

import Aux from "../../hoc/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Loading from "../../components/UI/Loading/Loading";
import errorHandler from "../../hoc/errorHandler/errorHandler";

import axiosInstance from "../../Axios";

const prices = {
  meat: 50,
  bacon: 40,
  salad: 30,
  cheese: 20,
};

export class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 60,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    // calling the ingredients
    axiosInstance.get("/ingredients.json").then((res) => {
      console.log(res);
      this.setState({
        ingredients: res.data,
      });
    });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const updatedPrice = this.state.totalPrice + prices[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount > 0) {
      const updatedCount = oldCount - 1;

      const updatedIngredients = { ...this.state.ingredients }; // state is immutuable so copying
      updatedIngredients[type] = updatedCount;

      const updatedPrice = this.state.totalPrice - prices[type];

      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
      });
    }
  };

  purchasingHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    console.log("puchasing");
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      email: "prem.ktr007@gmail.com",
      address: {
        street: "test",
        city: "test",
        pincode: 560085,
      },
    };

    axiosInstance
      .post("/orders.json", order)
      .then((res) => {
        console.log(res);
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    let orderSummary;

    const disabledInfo = { ...this.state.ingredients };

    // creating an object for disabling LESS button
    for (let key in disabledInfo) {
      disabledInfo[key] = this.state.ingredients[key] <= 0;
      // {salad: true, meat: false, bacon: true ..}
    }
    
    let burger = <Loading />;
    if (this.state.loading) {
      orderSummary = <Loading />;
    }

    // after ingredients are available
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          continue={this.purchaseContinueHandler}
          cancel={this.purchaseCancelHandler}
        />
      );

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.totalPrice <= 60}
            purchasing={this.purchasingHandler}
          />
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} hide={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default errorHandler(BurgerBuilder);

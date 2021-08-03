import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Loading from "../../components/UI/Loading/Loading";
import errorHandler from "../../hoc/errorHandler/errorHandler";
import axiosInstance from "../../Axios";
import { addIngredient, removeIngredient, getIngredients } from '../../store/actions/order';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

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
    /*  FOR REFERENCES  */
    // const queryParams = [];
    // for(let i in this.props.ings) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
    // }

    // queryParams.push('price=' + this.props.totalPrice);
    
    // const queryString = queryParams.join('&');    // bacon=1&cheese=1&meat=0&salad=1
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });

    this.props.history.push('/checkout');
  };

  render() {
    let orderSummary;

    const disabledInfo = { ...this.props.ings };

    // creating an object for disabling LESS button
    for (let key in disabledInfo) {
      disabledInfo[key] = this.props.ings[key] <= 0;
      // {salad: true, meat: false, bacon: true ..}
    }
    
    let burger = <Loading />;
    if (this.state.loading || this.props.error) {
      orderSummary = <Loading />;
    }

    // after ingredients are available
    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.totalPrice}
          continue={this.purchaseContinueHandler}
          cancel={this.purchaseCancelHandler}
        />
      );

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.totalPrice}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.props.totalPrice <= 60}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
    onInitIngredients: () => dispatch(getIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axiosInstance));

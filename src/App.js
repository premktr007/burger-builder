import React, { useEffect } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import { checkAuthState } from './store/actions/order';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";

const app  = (props) =>  {

  const { tryAuthLogin } = props;
  useEffect(() => {
      // auto login
      props.tryAuthLogin();
  }, [tryAuthLogin]) //when tryAuthLogin() is changed

  let routes;

  routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      {/* if no route matches */}
      <Redirect to="/" /> 
    </Switch>
  );

  if(props.isAuth) {
    routes = ( 
    <Switch>
      <Route path="/checkout" component={CheckOut} />
      <Route path="/orders" component={Orders} />
      <Route path="/logout" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
        {/* if no route matches */}
      <Redirect to="/" />
    </Switch>
    )
  }

  return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
  );
  }

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAuthLogin: () => dispatch(checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (app));

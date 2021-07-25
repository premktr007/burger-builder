import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
          {/* switch matches the first route */}
            <Switch>
              <Route path="/checkout" component={CheckOut} />
              <Route path="/orders" component={Orders} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

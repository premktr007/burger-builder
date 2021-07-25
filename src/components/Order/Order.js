import React from "react";

import classes from "./Order.css";

const order = (props) => {
  const ingredients = Object.keys(props.ingredients).map((key,i) => {
    return (
      <span key={i} className={classes.Ingredient}>
        {key}: {props.ingredients[key]}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p className={classes.Ingredients}> <b>Ingredients: </b>{ingredients} </p>
      <p>
        Cost: <b>{props.price}</b> INR
      </p>
    </div>
  );
};

export default order;

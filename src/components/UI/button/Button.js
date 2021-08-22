import React from 'react';

import classes from "./Button.css";

const button = (props) => (
  <button type={props.type}
    onClick={props.clicked}
    className={[classes.Button, classes[props.btnType]].join(' ')} //classNames are strings
  >
    {props.children}
  </button>
);

export default button;

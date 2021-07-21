import React, { useEffect } from "react";

import Aux from "../../../hoc/Auxi";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";

const modal = React.memo(
  (props) => {
    // checking whether component is updating
    useEffect(() => console.log('[Modal] update'));
    
    return (
    <Aux>
      <Backdrop show={props.show} clicked={props.hide} />
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(100vh)",
        }}
        className={classes.Modal}
      >
        {props.children}
      </div>
    </Aux>
    ); 
    },
  (prevProps, nextProps) => {
    // update only props and chilren component changes. if it is true. component not update
    return (prevProps.show === nextProps.show) && 
          (prevProps.children === nextProps.children);
    /* that supposed to be || condition unfortunetly that is not working so it is 
      chnaged to && */
  }
);

export default modal;

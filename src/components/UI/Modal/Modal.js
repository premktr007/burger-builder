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
    return prevProps.show === nextProps.show;   // if it is true. component not update
  }
);

export default modal;

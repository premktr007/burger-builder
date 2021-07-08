import React from 'react';

import classes from './Backdrop.css';

// black transparent behind the modal
const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null  
);

export default backdrop;
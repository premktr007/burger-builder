import React from 'react';

import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <li className={classes.NavigationItem}> 
            <a href="/" className={classes.active}>Burger Builder</a> 
        </li>
        <li className={classes.NavigationItem}> 
            <a href="/">Checkout</a>
        </li>
    </ul>
)

export default navigationItems;

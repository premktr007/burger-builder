import React from 'react';

import classes from './NavigationItems.css';
import { NavLink } from 'react-router-dom';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <li className={classes.NavigationItem}> 
            <NavLink to="/" exact>Home</NavLink> 
        </li>
        <li className={classes.NavigationItem}> 
            <NavLink to="/orders">Orders</NavLink> 
        </li>
    </ul>
)

export default navigationItems;

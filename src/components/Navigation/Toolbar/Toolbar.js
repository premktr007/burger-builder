import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.ToggleMenu} onClick={props.toggleMenu}>
        <img src="https://img.icons8.com/material-outlined/40/ffffff/menu--v1.png" alt="menu"/>
        </div>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItem />
        </nav>
    </header>
);

export default toolbar;
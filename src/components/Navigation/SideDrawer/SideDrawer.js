import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxi';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let drawerClasses;

    if(props.showDrawer) {
        drawerClasses = [classes.SideDrawer, classes.Open];
    }
    else {
        drawerClasses = [classes.SideDrawer, classes.Close];
    }

    return (
        <Aux>
            <Backdrop show={props.showDrawer} clicked={props.drawerClosed}/>
                <div className={drawerClasses.join(' ')}>
                    <div className={classes.Logo}>
                        <Logo/>
                    </div>
                    <NavigationItems />
                </div>
        </Aux>
    )
}

export default sideDrawer;

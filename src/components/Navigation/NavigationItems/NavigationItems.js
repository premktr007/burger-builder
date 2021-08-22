import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.css';
import { authLogout } from '../../../store/actions/order';

const navigationItems = (props) => {
    let navigationBar = (
        <ul className={classes.NavigationItems}>
                <li className={classes.NavigationItem} onClick={props.resetPrice}> 
                    <NavLink to="/" exact>Home</NavLink> 
                </li>
            <li className={classes.NavigationItem}> 
                <NavLink to="/auth">Authenticate</NavLink> 
            </li>
        </ul>
    )
    if(props.isAuth) {
        navigationBar = (
            <ul className={classes.NavigationItems}>
                <li className={classes.NavigationItem}> 
                    <NavLink to="/" exact>Home</NavLink> 
                </li>
                <li className={classes.NavigationItem}> 
                    <NavLink to="/orders">Orders</NavLink> 
                </li>
                <li className={classes.NavigationItem}> 
                    <NavLink to="/logout"  onClick={props.logout} >Logout</NavLink> 
                </li>
            </ul>
        )
    }

    return navigationBar;
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (navigationItems);

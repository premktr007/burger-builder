import React, { Component } from 'react';

import Aux from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export class Layout extends Component {
    state = {
        showDrawer: false
    }

    
    sideDrawerOpen = () => {
        this.setState({showDrawer: true});
    }

    sideDrawerClose = () => {
        this.setState({showDrawer: false});
    }
    render() {
        return (
            <Aux>
                <Toolbar toggleMenu={this.sideDrawerOpen}/>
                <SideDrawer showDrawer={this.state.showDrawer} 
                    drawerClosed={this.sideDrawerClose}/>
                <main className={classes.Content}>
                { this.props.children }
                </main>
            </Aux>
        )
    }
}


export default Layout;
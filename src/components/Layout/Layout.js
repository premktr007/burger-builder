import React, { useState } from 'react';

import Aux from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) =>  {

    const [showDrawer, setState ] = useState(false);

    const sideDrawerOpen = () => {
        setState(true);
    }

    const sideDrawerClose = () => {
        setState(false)
    }

    return (
        <Aux>
            <Toolbar toggleMenu={sideDrawerOpen}/>
            <SideDrawer showDrawer={showDrawer} 
                drawerClosed={sideDrawerClose}/>
            <main className={classes.Content}>
            { props.children }
            </main>
        </Aux>
        )
    }

export default layout;
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axiosInstance from '../../Axios';
import Order from '../../components/Order/Order';
import Loading from '../../components/UI/Loading/Loading';
import errorHandler from '../../hoc/errorHandler/errorHandler';

const orders = (props) => {
    const [stateValue, setState] = useState({
        orders: [],
        loading: true
    });

    // getting the orders
    useEffect(() => {
        const queryParams = `?auth=${props.token}&orderBy="userId"&equalTo="${props.userId}"`;
        axiosInstance.get('/orders.json'+ queryParams).then(res => {
            transformData(res);
            /* functional components will have functional setStates */
            setState(prevState => ({ ...prevState, loading: false}));  
        }).catch(err => {
            setState(prevState => ({ ...prevState, loading: false}));  
        });
    }, []);

    // transforming firebase response(objects of objects) into array of objects
    const transformData = (response) => {

        // simplified logic
        const ordersData = [];
        if(response.data) {
            for (let key in response.data) {
                ordersData.unshift({
                    ...response.data[key],
                    id: key
                })
            }
        }
        
        // const ordersData = Object.keys(response.data).map(key => {
        //     const orderObj = response.data[key];
        //     return {
        //         email: orderObj.email,
        //         ingredients: orderObj.ingredients,
        //         price: orderObj.price,
        //         address: orderObj.address
        //     }
        // });
        
        // this should be functional setState
        setState((prevState) => ({...prevState, orders: ordersData }));
    }
    
    let orders;

    if(stateValue.loading) {
        orders = <Loading />
    }
    else if(stateValue.orders.length === 0 && props.token) {
        orders = <h1 style={{textAlign: "center"}}>There are no orders yet.</h1>
    }
    else {
        orders = stateValue.orders.map((order) => <Order 
                key={order.id}
                ingredients={order.ingredients} 
                price={order.price}
                customer={order.customerDetails}
                />); 
    }

    return(
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps) (errorHandler(orders, axiosInstance));
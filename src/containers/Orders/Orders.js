import React, { useState, useEffect } from 'react';

import axiosInstance from '../../Axios';
import Order from '../../components/Order/Order';
import Loading from '../../components/UI/Loading/Loading';
import errorHandler from '../../hoc/errorHandler/errorHandler';

const orders = () => {
    const [stateValue, setState] = useState({
        orders: [],
        loading: true
    });

    // getting the orders
    useEffect(() => {
        axiosInstance.get('/orders.json').then(res => {
            transformData(res);
            /* functional components will have functional setStates */
            setState(prevState => ({ ...prevState, loading: false}));  
        }).catch(err => {
            console.log(err)
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
    else if(stateValue.orders.length === 0) {
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

export default errorHandler(orders, axiosInstance);
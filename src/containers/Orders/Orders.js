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
            /* didn't understand properly but the guess is that we already setting the state in transformData() 
            so setting the state again might require to merge the value with previous state*/
            setState(prevState => ({ ...prevState, loading: false}));  
        }).catch(err => {
            console.log(err)
            setState(prevState => ({ ...prevState, loading: false}));  
        })
    }, []);

    // transforming firebase response(objects of objects) into array of objects
    const transformData = (response) => {

        // simplified logic
        const ordersData = [];
        if(response.data) {
            for (let key in response.data) {
                ordersData.push({
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
        setState({orders: ordersData })
    }
    
    let orders;
    orders = stateValue.orders.map((order) => <Order 
                key={order.id}
                ingredients={order.ingredients} 
                price={order.price}
                />); 
        
    if(stateValue.loading) {
        orders = <Loading />
    }

    return(
        <div>
            {orders}
        </div>
       
    )
}

export default errorHandler(orders, axiosInstance);
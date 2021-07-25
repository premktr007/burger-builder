import React, { useState, Fragment } from 'react';

import classes from './Contact.css';
import Button from '../../../components/UI/button/Button'
import axiosInstance from '../../../Axios';
import Loading from '../../../components/UI/Loading/Loading';
import { withRouter } from 'react-router';

const contact = (props) => {
    const [stateValue, setState] = useState({
        address: null, 
        loading: false
    });

    const orderHandler = (event) => {
        setState({loading: true})
        event.preventDefault();

        const order = {
        ingredients: props.ingredients,
        price: props.totalPrice,
        email: "prem.ktr007@gmail.com",
        address: {
            street: "test",
            city: "test",
            pincode: 560085,
        }
        };

        axiosInstance.post("/orders.json", order)
        .then((res) => {
            console.log(res);
            setState({ loading: false});
            props.history.push('/');
        })
        .catch((err) => {
            console.log(err);
            setState({ loading: false});
            props.history.push('/');
        });
        }

        let form;
        form = (
                <div className={classes.Contact}>
                <h3>Enter Your Contact Address</h3>
                <form>
                    <label>Name</label>
                        <input type="text" placeholder="John Smith"/>
                    
                    <label>Email</label>
                    <input type="email" placeholder="example@example.com" />
                    
                    <label>Street</label>
                    <input type="text" placeholder="50ft road, Girinagara" />

                    <label>Area</label>
                    <input type="text" placeholder="Katriguppe, BSK 3rd stage" />

                    <label>Pincode</label>
                    <input type="number" placeholder="560085" />

                    <Button btnType="Success" clicked={orderHandler}>Order</Button> 
                </form>
            </div>  )
            
        if(stateValue.loading) {
            form =  <Loading />
        }

    return (
        <Fragment>
            {form}
        </Fragment>
        
    )
}

export default withRouter(contact);
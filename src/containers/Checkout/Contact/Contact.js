import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import classes from './Contact.css';
import Button from '../../../components/UI/button/Button'
import Loading from '../../../components/UI/Loading/Loading';
import Input from '../../../components/UI/Input/Input';
import { saveOrder } from '../../../store/actions/order';
import withErrorHandler from '../../../hoc/errorHandler/errorHandler';
import axiosInstance from '../../../Axios';

const contact = (props) => {
    const [stateValue, setState] = useState({
        orderForm:[
            {
                elementType: 'input',
                config: {
                    name: 'name',
                    type: 'text',
                    label: 'Name',
                    placeholder: 'Your Name',
                    required: true,
                    minLength: '4'
                }
            },
            {
                elementType: 'input',
                config: {
                    name: 'email',
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Your Email',
                    required: true
                }
            },
            {
                elementType: 'input',
                config: {
                    name: 'phone',
                    type: 'number',
                    label: 'Mobile Numer',
                    placeholder: 'Your Phone number',
                    required: true,
                    max: '9999999999',
                    min: '6000000000'
                }
            },
            {
                elementType: 'text',
                config: {
                    name: 'address',
                    label: 'Address',
                    placeholder: 'Your Address',
                    required: true,
                    columns: 10,
                    rows: 5,
                    minLength: '10'
                }
            },
            {
                elementType: 'select',
                config: {
                    name: 'delivery',
                    label: 'Delivery Type',
                    required: true,
                }
            }
        ], 
    });

    let formData = {}
    const inputChangedHandler = (event) => {
        formData[event.target.name] = event.target.value;
    }

    const orderHandler = (event) => {
        setState((prev) => ({ ...prev, loading: true }));
        event.preventDefault();

        // handling the case when dropdown isnt touched
        if(!formData.hasOwnProperty('delivery')) {
            formData['delivery'] = 'normal';
        }

        const order = {
            ingredients: props.ings,
            price: props.totalPrice,
            customerDetails: formData
            };
            
            props.onPurchasingOrder(order, props.history);
        }

        let form;
        if(!props.loading) {
            form = (
                <div className={classes.Contact}>
                <h3>Enter Your Contact Address</h3>
                <form className={classes.Form} onSubmit={orderHandler}>
                    {stateValue.orderForm.map((field, i) => {
                        return (
                            <Input type={field.elementType} 
                                    options={field.config} 
                                    label={field.config.label} 
                                    changed={inputChangedHandler}
                                    key={i}
                                    />
                        )
                    })}
                    <Button btnType="Success">Order</Button> 
                </form>
            </div>  )
        }
        else {
            form =  <Loading />
        }

    return (
        <Fragment>
            {form}
        </Fragment>
        
    )
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
return {
        onPurchasingOrder: (order, route) => dispatch(saveOrder(order, route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)  (withRouter(withErrorHandler(contact, axiosInstance)));
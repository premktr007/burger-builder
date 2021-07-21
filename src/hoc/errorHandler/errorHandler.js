import React, { useEffect, useState } from 'react';

import Aux from '../Auxi';
import Modal from '../../components/UI/Modal/Modal';
import axiosInstance from '../../Axios';

// everything is lowercase because it is not a component
const errorHandler = (Component) => {
    return (props) => {
        const [error, setError] = useState(null);

        useEffect(() => {
            const interceptor =  axiosInstance.interceptors.response.use(res => res, err => {
                setError(err.message)
            })
            
            return () => {
            axiosInstance.interceptors.response.eject(interceptor);
            }
        });

        const hideError = () => {
            setError(null);
        }
        return (
            <Aux>
                <Modal show={error}>
                    <h3>{error}</h3>
                    <button onClick={hideError}>OK</button> 
                </Modal>
                <Component {...props}/>
            </Aux>
        )
    }
}

export default errorHandler;
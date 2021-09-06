import React, { useEffect, useState } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxi';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return (props) => {

        const [error, setState ] = useState(null);

        const reqInterceptor = axios.interceptors.request.use( req => {
            setState(null);
            return req;
        } );

        const resInterceptor = axios.interceptors.response.use( res => res, err => {
            setState(err);
        } );
        
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        },[reqInterceptor, resInterceptor])

        const errorConfirmedHandler = () => {
            setState(null);
        }

        return (
                <Aux>
                    <Modal show={error}>
                        {error ? error.message : null} <br/>
                        <button onClick={errorConfirmedHandler}> OK </button>
                    </Modal>
                    
                    <WrappedComponent {...props} />
                </Aux>
            );
        }
}

export default withErrorHandler;
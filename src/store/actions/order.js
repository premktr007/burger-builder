import axios from 'axios';

import * as actionTypes from './actionTypes';
import axiosInstance from '../../Axios';

// AUTHENTICATION
const auth = (email, password, isSignUp, router) => {
    return dispatch => {
        dispatch(loading());
        const body = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZyG--k82Lj1l2mZl7NsV8U6SHQc1U-8U`;
        if (!isSignUp) {
            url =  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZyG--k82Lj1l2mZl7NsV8U6SHQc1U-8U`;
        }

        axios.post(url, body).then(res => {
            // storing token for auto-login
            const expirationDate = new Date(new Date().getTime() + (+res.data.expiresIn * 1000));
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expiryDate', expirationDate);
            localStorage.setItem('userId', res.data.localId)

            dispatch(setAuthLogin(res.data.idToken, res.data.localId));
            dispatch(isTokenExpired(+res.data.expiresIn))
            // router.replace('/');
        }).catch(err => {
            dispatch(failedCall(err.response.data.error));
        })
    }
}

const authLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
        // dispatch(setAuthLogout());
        return {
            type: actionTypes.AUTH_LOGOUT,
        }
}

// checking for auto login
const checkAuthState = () => {
    return dispatch => {
        const token  = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expiryDate'));

        if(!token || expirationDate < new Date()) {
            dispatch(setAuthLogout());
        }
        else {
            const userId = localStorage.getItem('userId');
            dispatch(setAuthLogin(token, userId));
            dispatch(isTokenExpired((expirationDate.getTime() - new Date().getTime()) / 1000 ));
        }
    }
    
}

// Logout after token is expired
const isTokenExpired = (timer) => {
    return dispatch => {
        setInterval(() => {
            dispatch(authLogout());
        }, timer*1000);
    }
} 

// INTIAL INGREDIENTS TATE
const getIngredients = () => {
    return dispatch => {
        dispatch(loading());
        // getting the ingredients
        axiosInstance.get("/ingredients.json").then((res) => {
            dispatch(initIngredients(res.data));
        }).catch((err) => {
            dispatch(failedCall(err));
        });
    }
}

// SAVING ORDER
const saveOrder = (order, route, token) => {
    return dispatch => {
        dispatch(loading());
        axiosInstance.post('/orders.json?auth='+token, order)
        .then((res) => {
            dispatch(resetIngredients());
            route.push('/orders');
        })
        .catch((err) => {
            dispatch(failedCall(err));
            route.push('/');
        });
        
    }
}


const setAuthLogin = (token, userId) => {
    return {
        type: actionTypes.AUTH_LOGIN,
        authData: {
            token:  token,
            userId: userId
        }
    }
}

const setAuthLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}


const initIngredients = (ingredientsObj) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredientsObj
    }
}


const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: name
    }
}


const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: name
    }
}


const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS,
    }
}


const loading = () => {
    return {
        type: actionTypes.LOADING
    }
}


const failedCall = (error) => {
    return {
        type: actionTypes.FAILED_CALL,
        error: error.message
    }
}

export { auth, getIngredients, addIngredient, removeIngredient, resetIngredients, saveOrder, authLogout, checkAuthState }

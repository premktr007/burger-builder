import * as actionTypes from './actionTypes';
import axiosInstance from '../../Axios';

const getIngredients = () => {
    return dispatch => {
        dispatch(loading());
        // getting the ingredients
        axiosInstance.get("/ingredients.json").then((res) => {
            dispatch(initIngredients(res.data));
        }).catch((err) => {
            dispatch(failedCall());
        });
    }
}

const saveOrder = (order, route) => {
    return dispatch => {
        dispatch(loading());
        axiosInstance.post('/orders.json', order)
        .then((res) => {
            dispatch(resetIngredients());
            route.push('/orders');
        })
        .catch((err) => {
            dispatch(failedCall());
            route.push('/');
        });
        
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

const failedCall = () => {
    return {
        type: actionTypes.FAILED_CALL
    }
}

export { getIngredients, addIngredient, removeIngredient, resetIngredients, saveOrder }

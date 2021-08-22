import * as actionType from './actions/actionTypes';

const intialState = {
    auth: {
        token: null,
        userId: null,
    },
    ingredients: null,
    totalPrice: 60,
    orders: null,
    loading: false,
    error: false,

}

const INGREDIENT_PRICES = {
    meat: 50,
    bacon: 40,
    salad: 30,
    cheese: 20,
};

// AUTENTICATION LOGIN
const setLogin = (state, action) => {
    return {
        ...state,
        auth: {
            ...state.auth,
            token: action.authData.token,
            userId: action.authData.userId
        },
        error: false,
        loading: false
    }
}

// AUTHENTICATION LOGOUT
const setLogout = (state) => {
    return {
        ...state,
        auth: {
            ...state.auth,
            token: null,
            userId: null
        }
    }
}

// INTIAL INGREDIENT STATE
const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients:  {
            /* In firebase this object is ordered by keys alphabetically 
            so we are setting the burger ingredients here */
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        error: false,
        loading: false
    }
}


// ADDING INGREDIENT
const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredient] : state.ingredients[action.ingredient] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
    }
}

// REMOVE INGREDIENT
const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredient] : state.ingredients[action.ingredient] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
    }
}

// RESETTING INGREDIENT
const resetIngredients = (state) => {
    return {
        ...state,
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 60,
        loading: false,
        error: false
    }
}


// LOADING
const setLoading = (state) => {
    return {
        ...state,
        loading: true
    }
}

// ERROR
const throwError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

// REDUCER
const reducer = (state = intialState, action) => {
    switch (action.type) {

        case actionType.AUTH_LOGIN:
            return setLogin(state, action);

        case actionType.AUTH_LOGOUT:
            return setLogout(state)
            
        case actionType.INIT_INGREDIENTS:
            return setIngredients(state, action);

        case actionType.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actionType.REMOVE_INGREDIENT:
            return removeIngredient(state, action);

        case actionType.RESET_INGREDIENTS:
            return resetIngredients(state);

        case actionType.LOADING:
            return setLoading(state);
            
        case actionType.FAILED_CALL:
            return throwError(state, action);
        
        default:
            return state;
    }
}

export default reducer;
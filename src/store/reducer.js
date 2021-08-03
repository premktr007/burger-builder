import * as actionType from './actions/actionTypes';

const intialState = {
    ingredients: null,
    totalPrice: 60,
    orders: null,
    loading: false,
    error: false
}

const INGREDIENT_PRICES = {
    meat: 50,
    bacon: 40,
    salad: 30,
    cheese: 20,
};

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

const setLoading = (state) => {
    return {
        ...state,
        loading: true
    }
}

const throwError = (state) => {
    return {
        ...state,
        error: true
    }
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actionType.REMOVE_INGREDIENT:
            return removeIngredient(state, action);

        case actionType.RESET_INGREDIENTS:
            return resetIngredients(state);

        case actionType.INIT_INGREDIENTS:
            return setIngredients(state, action);
        
        case actionType.LOADING:
            return setLoading(state);
            
        case actionType.FAILED_CALL:
            return throwError(state);
        
        default:
        return state;
    }
}

export default reducer;
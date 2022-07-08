import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";



export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };

        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state; // if none of the above work we just want ot return initial state
    }
};



export const productDetailsReducer = (state = { product: {reviews: []} }, action) => {  // jab bhi ham reducer banate hai ham fucntion ke pahle argument main state(apna varibale) bana lete hai jaisa need ho,,,, upper wale mai hamne sirf ek array ke liye state(variable) - products - bana liya aur phir action ke hisab se usski value update kar di aur abb isko hi  hamara compnent use karega
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state; // if none of the above work we just want ot return initial state
    }
};


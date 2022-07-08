import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

} from "../constants/productConstants";
import axios from "axios";


export const listProducts = () => async (dispatch) => {
    try {
        
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get("http://localhost:8000/api/products/"); // this gives me a javascript object with headers and all other info, the actual data it inside a property called 'data' therefor we will destructure it

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`http://localhost:8000/api/products/${id}`); // this gives me a javascript object with headers and all other info, the actual data it inside a property called 'data' therefor we will destructure it

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
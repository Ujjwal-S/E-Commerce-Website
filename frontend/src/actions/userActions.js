import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "http://localhost:8000/api/users/login/",
            { username: email, password: password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        error.message = "Login Failed, Are you sure you have an account with us?"
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.message && error.message.detail
                    ? error.message.detail
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
}
// name email password
export const register = (name, email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const { data } = await axios.post(
            "http://localhost:8000/api/users/register/",
            {name, email, password},
            config
        )
        
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.message && error.message.detail
                    ? error.message.detail
                    : error.message
        })
    }
}
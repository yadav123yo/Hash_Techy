import {
    AUTH_SIGNUP_LOADING,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_ERROR,
    AUTH_SIGNIN_LOADING,
    AUTH_SIGNIN_SUCCESS,
    AUTH_SIGNIN_ERROR,
} from './ActionTypes';
import axios from 'axios';

export const signup = (data) => async (dispatch) => {
    dispatch({ type: AUTH_SIGNUP_LOADING });
    try {
        const res = await axios.post('https://nine1mobiles.onrender.com/signup', data);
        console.log('res: ', res);
        dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: {
            message: res.data.message
        }});
    } catch (error) {
        console.log('error: ', error);
        dispatch({ type: AUTH_SIGNUP_ERROR, payload: {
            message: error.response.data.message
        } });
    }
}

export const signin = (data) => async (dispatch) => {
    dispatch({ type: AUTH_SIGNIN_LOADING });
    try {
        const res = await axios.post('https://nine1mobiles.onrender.com/login', data);
        console.log('res: ', res);
        dispatch({ type: AUTH_SIGNIN_SUCCESS, payload: {
            message: res.data.message,
            token: res.data.token,
            role: res.data.role
        }});
    } catch (error) {
        console.log('error: ', error);
        dispatch({ type: AUTH_SIGNIN_ERROR, payload: {
            message: error.response.data.message
        } });
    }
}
import axios from 'axios';

import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from './types';
import setAuthToken from '../../util/setAuthToken';

export const loadUser = () => async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => {
                dispatch(setAlert(err.msg, 'danger'));
            });
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}
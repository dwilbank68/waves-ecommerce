import axios from 'axios';
import {USER_SERVER} from "../constants.js";
import {AUTH_USER, CLEAR_UPDATE_USER, LOGIN_USER, LOGOUT_USER,
    REGISTER_USER, UPDATE_USER} from "./actionTypes.js";

export const auth = () => {
    const request = axios
        .get(`${USER_SERVER}/auth`)
        .then(res => res.data)
    return {
        type: AUTH_USER,
        payload: request
    }
}

export const loginUserAction = (dataToSubmit) => {
    const request = axios
        .post(`${USER_SERVER}/login`, dataToSubmit)
        .then(res => res.data)
    return {
        type: LOGIN_USER,
        payload: request
    }
};

export const logoutUserAction = () => {
    const request = axios
        .get(`${USER_SERVER}/logout`)
        .then(res => res.data)
    return {
        type: LOGOUT_USER,
        payload: request
    }
};

export const registerUserAction = (dataToSubmit) => {
    const request = axios
        .post(`${USER_SERVER}/register`, dataToSubmit)
        .then(res => res.data)
    return {
        type: REGISTER_USER,
        payload: request
    }
};

export const updateUserAction = (dataToSubmit) => {
    const request = axios
        .post(`${USER_SERVER}/update_profile`, dataToSubmit)
        .then(res => res.data)
    return {
        type: UPDATE_USER,
        payload: request
    }
};

export const clearUpdateUserAction = () => ({
    type: CLEAR_UPDATE_USER
});

// test('should return  action obj', () => {
//     const action = ();
//     expect(action).toEqual({
//         type:
//     })
// })
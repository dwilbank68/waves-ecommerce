// import _ from 'lodash';
import {
    ADD_TO_CART, CLEAR_UPDATE_USER, GET_CART_ITEMS, PAYMENT_SUCCESS, REMOVE_CART_ITEM,
    AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER, UPDATE_USER
} from '../actions/actionTypes.js';

let INITIAL_STATE = {};

const userReducer = (state=INITIAL_STATE, {payload, type}) => {
    switch(type){
        case ADD_TO_CART: return {...state, userData:{...state.userData, cart: payload}};
        case GET_CART_ITEMS: return {...state, cartDetails: payload};
        case PAYMENT_SUCCESS: return {
            ...state, successBuy: true,
            userData: {...state.userData, cart: payload.cart},
            cartDetails: payload.cartDetails
        };
        case REMOVE_CART_ITEM: return {
            ...state, cartDetails: payload.cartDetails,
            userData: {...state.userData, cart: payload.cart}
        };

        case AUTH_USER: return {...state, userData: payload};
        case LOGIN_USER: return {...state, loginSuccess: payload};
        case LOGOUT_USER: return {...state};
        case REGISTER_USER: return {...state, register: payload};
        case UPDATE_USER: return {...state, updateUser: payload};
        case CLEAR_UPDATE_USER: return {...state, updateUser: null};
        default: return state;
    };
};

export default userReducer;
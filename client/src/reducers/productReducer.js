// import _ from 'lodash';
import {
    ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, CLEAR_PRODUCT,
    GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL, GET_PRODUCTS_TO_SHOP,
    ADD_BRAND, GET_BRANDS, ADD_WOOD, GET_WOODS
} from '../actions/actionTypes.js';

let INITIAL_STATE = {};

const productReducer = (state=INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch(type){
        case ADD_PRODUCT: return {...state, addProduct: payload}
        case DELETE_PRODUCT: return {...state, addProduct: ''}

        case GET_PRODUCT: return {...state, product: payload}
        case CLEAR_PRODUCT: return {...state, product: payload}

        case GET_PRODUCTS_BY_ARRIVAL: return {...state, byArrival: payload}
        case GET_PRODUCTS_BY_SELL: return {...state, bySell: payload}
        case GET_PRODUCTS_TO_SHOP: return {...state, toShop:payload.articles, toShopSize: payload.size}

        case ADD_BRAND: return {...state, addBrand: action.payload.success, brands: payload.brands}
        case GET_BRANDS: return {...state, brands: payload}
        case ADD_WOOD: return {...state, addWood: action.payload.success, woods: payload.woods}
        case GET_WOODS: return {...state, woods: payload}
        default: return state;
    };
};

export default productReducer;
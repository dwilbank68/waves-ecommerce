import axios from "axios";
import {PRODUCT_SERVER, USER_SERVER} from "../constants";
import {ADD_TO_CART, GET_CART_ITEMS, PAYMENT_SUCCESS, REMOVE_CART_ITEM} from "./actionTypes";

export const addToCartAction = (id) => {
    const request = axios.post(`${USER_SERVER}/addToCart?productId=${id}`)
        .then(res => res.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
};

export const getCartItemsAction = (items, cart) => {
    const request = axios
        .get(`${PRODUCT_SERVER}/products_by_id?id=${items}&type=array`)
        .then(res => {
            cart.forEach(item => {
                res.data.forEach((k,i) => {
                    if (item.id === k._id) {
                        res.data[i].quantity = item.quantity;
                    }
                })
            })
            return res.data;
        })
    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

export const paymentSuccessAction = (data) => {
    const request = axios
        .post(`${USER_SERVER}/successBuy`, data)
        .then(res => res.data)
    return {
        type: PAYMENT_SUCCESS,
        payload: request
    }
};

export const removeCartItemAction = id => {
    const req = axios
        .get(`${USER_SERVER}/removeFromCart?id=${id}`)
        .then(res => {
            res.data.cart.forEach(item => {
                res.data.cartDetails.forEach((k,i) => {
                    if (item.id === k._id) {
                        res.data.cartDetails[i].quantity = item.quantity;
                    }
                })
            })
            return res.data;
        })
    return { type: REMOVE_CART_ITEM, payload: req}
}
import axios from 'axios';
import {PRODUCT_SERVER} from "../constants.js";
import {ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, CLEAR_PRODUCT,
        GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL, GET_PRODUCTS_TO_SHOP,
        ADD_BRAND, GET_BRANDS, ADD_WOOD, GET_WOODS} from "./actionTypes.js";

export const addProductAction = (productObj) => {
    const request = axios
        .post(`${PRODUCT_SERVER}/product`, productObj)
        .then(res => res.data)
    return {
        type: ADD_PRODUCT,
        payload: request
    }
};

export const deleteProductAction = () => {
    return {
        type: DELETE_PRODUCT
    }
};

export const getProductAction = (id) => {
    const request = axios
        .get(`${PRODUCT_SERVER}/products_by_id?id=${id}&type=single`)
        .then(res => {
            return res.data[0]
        })
        return { type: GET_PRODUCT, payload: request}
}

export const clearProductAction = () => {
    return {type: CLEAR_PRODUCT, payload:''}
}

export const getProductsByArrivalAction = () => {
    const request = axios
        .get(`${PRODUCT_SERVER}/products?sortBy=createdAt&order=desc&limit=4`)
        .then(res => res.data)
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
};

export const getProductsBySellAction = () => {
    const request = axios
        .get(`${PRODUCT_SERVER}/products?sortBy=sold&order=desc&limit=4`)
        .then(res => res.data)
    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }
};

export const getProductsToShopAction = (skip, limit, filters=[], prevState=[]) => {
    const opts = { limit, skip, filters }
    const request = axios
        .post(`${PRODUCT_SERVER}/shop`, opts)
        .then(res => {
            let newState = [...prevState, ...res.data.articles]
            // newState is the existing products, plus all the new articles
            return {
                size: res.data.size,
                articles: newState
            }
        })
    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }
};

//////////////// CATEGORIES ///////////////////

export const addBrandAction = (newBrand, existingBrands) => {
    console.log('addBrandAction is firing');
    const request = axios
        .post(`${PRODUCT_SERVER}/brand`, newBrand)
        .then(res => {
            let brands = [...existingBrands, res.data.newBrand]
            return {success: res.data.success, brands}
        });
    return {
        type: ADD_BRAND,
        payload: request
    }
};

export const getBrandsAction = () => {
    const request = axios
        .get(`${PRODUCT_SERVER}/brands`)
        .then(res => res.data)
    return {
        type: GET_BRANDS,
        payload: request
    }
};

export const addWoodAction = (newWood, existingWoods) => {
    const request = axios
        .post(`${PRODUCT_SERVER}/wood`, newWood)
        .then(res => {
            let woods = [...existingWoods, res.data.wood]
            return {success: res.data.success, woods}
        });
    return {
        type: ADD_WOOD,
        payload: request
    }
};

export const getWoodsAction = () => {
    const request = axios
        .get(`${PRODUCT_SERVER}/woods`)
        .then(res => res.data)
    return {
        type: GET_WOODS,
        payload: request
    }
};



import axios from "axios";
import {SITE_SERVER} from "../constants";
import {GET_SITE_DATA, UPDATE_SITE_DATA} from "./actionTypes";

export const getSiteDataAction = () => {
    const request = axios
        .get(`${SITE_SERVER}/site_data`)
        .then(res => res.data);

    return {
        type: GET_SITE_DATA,
        payload: request
    }
};

export const updateSiteDataAction = (data) => {
    const request = axios
        .post(`${SITE_SERVER}/site_data`, data)
        .then(res => res.data);

    return {
        type: UPDATE_SITE_DATA,
        payload: request
    }
};

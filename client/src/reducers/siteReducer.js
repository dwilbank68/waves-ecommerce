import {GET_SITE_DATA, UPDATE_SITE_DATA} from "../actions/actionTypes";

let INITIAL_STATE = {};

const siteReducer = (state=INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch(type){
        case GET_SITE_DATA: return {...state, siteData: payload}
        case UPDATE_SITE_DATA: return {...state, siteData: payload.siteInfo}
        default: return state;
    };
};

export default siteReducer;
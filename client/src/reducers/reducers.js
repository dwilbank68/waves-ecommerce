import {combineReducers} from 'redux';
import user from './userReducer';
import products from './productReducer';
import site from './siteReducer';

const rootReducer = combineReducers({
    products,
    site,
    user
});

export default rootReducer;
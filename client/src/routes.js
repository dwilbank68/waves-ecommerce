import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Auth from './components/hoc/Auth.jsx';
import Layout from './components/hoc/Layout.jsx';

import Home from './components/home/Home.jsx';
import RegisterLogin from './components/auth/RegisterLogin.jsx';
import Register from './components/auth/Register.jsx';
import Shop from './components/shop/Shop.jsx';
import Product from './components/Product/Product.jsx';

import Cart from './components/user/Cart.jsx';
import Dashboard from './components/user/Dashboard.jsx';
import AddProduct from './components/user/admin/AddProduct.jsx';
import ManageCategories from './components/user/admin/ManageCategories.jsx';
import ManageSite from './components/user/admin/ManageSite.jsx';
import UpdateProfile from './components/user/UpdateProfile.jsx';

const Routes = () => {
    // null = public route
    return (
        <Switch>
            <Layout>
                <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
                <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
                <Route path="/admin/manage_site" exact component={Auth(ManageSite, true)} />

                <Route path="/user/cart" exact component={Auth(Cart, true)} />
                <Route path="/user/dashboard" exact component={Auth(Dashboard, true)} />
                <Route path="/user/user_profile" exact component={Auth(UpdateProfile, true)} />

                <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
                <Route path="/register" exact component={Auth(Register, false)} />
                <Route path="/product/:id" exact component={Auth(Product, null)} />
                <Route path="/shop" exact component={Auth(Shop, null)} />
                <Route path="/" exact component={Auth(Home, null)} />
            </Layout>
        </Switch>
    )
}

export default Routes;

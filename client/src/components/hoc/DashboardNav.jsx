import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
    {name:'My Account', linkTo: '/user/dashboard'},
    {name:'User Information', linkTo: '/user/user_profile'},
    {name:'My Cart', linkTo: '/user/cart'}
]

const adminLinks = [
    {name:'Site Info', linkTo: '/admin/manage_site'},
    {name:'Add Products', linkTo: '/admin/add_product'},
    {name:'Manage Categories', linkTo: '/admin/manage_categories'}
]

const DashboardNav = ({children, user}) => {

    const generateLinks = links => (
        links.map((item, i) => (
            <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
        ))
    )

    return (
        <div    className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>My Account</h2>
                    <div className="links">
                        {generateLinks(links)}
                    </div>
                    {user.userData.isAdmin ?
                        <div>
                            <h2>Admin</h2>
                            <div className="links">
                                {generateLinks(adminLinks)}
                            </div>
                        </div>
                    : null}
                </div>
                <div className="user_right_nav">
                    {children}
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(DashboardNav)

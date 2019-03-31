import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import Header from './Header.jsx';
import {logoutUserAction} from "../actions/userActions";

class Header extends Component {

    state = {
        page: [
            {name:'Home', linkTo:'/', public:true},
            {name:'Guitars', linkTo:'/shop', public:true}
        ],
        user: [
            {name:'My Cart', linkTo:'/user/cart', public:false},
            {name:'My Account', linkTo:'/user/dashboard', public:false},
            {name:'Log In', linkTo:'/register_login', public:true},
            {name:'Log Out', linkTo:'/user/logout', public:false}
        ]
    }

    cartLink = (item, i) => {
        const user = this.props.user.userData;
        return (
            <div className='cart_link' key={i}>
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link   to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        )
    }


    defaultLink = (item, i) => (
        item.name === 'Log Out' ?
        <div    className='log_out_link'
                key={i}
                onClick={() => this.logoutHandler()}>
            {item.name}
        </div>
        :
        <Link   to={item.linkTo}
                key={i}>
            {item.name}
        </Link>
    )

    logoutHandler = () => {
        const {dispatch, history} = this.props;
        dispatch(logoutUserAction())
            .then(res => {
                if (res.payload.success) history.push('/')
            })
    }

    showLinks = (type) => {
        let list = [];
        if (this.props.user.userData) {
            type.forEach(item => {
                if (!this.props.user.userData.isAuth) {
                    if (item.public) {
                        list.push(item)
                    }
                } else {
                    if (item.name !== 'Log In') {
                        list.push(item)
                    }
                }
            })
        }
        return list.map((item, i) => {
            if (item.name !== 'My Cart') return this.defaultLink(item,i)
            return this.cartLink(item,i)
        })
    }

    render() {

        return (
            <header    className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            WAVES
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            {this.showLinks(this.state.user)}
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

// const mapStateToProps = (state, props) => ({
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withRouter(Header));
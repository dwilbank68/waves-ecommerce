import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import DashboardNav from '../hoc/DashboardNav.jsx';
import CartProductBlock from '../UI/CartProductBlock.jsx';
import PayPal from '../UI/PayPal.jsx';

import {getCartItemsAction, paymentSuccessAction, removeCartItemAction} from "../../actions/cartActions";

class Cart extends Component {

    state = {
        loading: true,
        showSuccess: false,
        showTotal: false,
        total: 0
    }

    componentDidMount() {
        let cartItems = [];
        let user = this.props.user;
        if (user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                this.props.dispatch(getCartItemsAction(cartItems, user.userData.cart))
                    .then(() => {
                        if (this.props.user.cartDetails.length > 0) {
                            this.calcTotal(this.props.user.cartDetails)
                        }
                    })
            }
        }
    }

    calcTotal = (cartDetails) => {
        let total = 0;
        cartDetails.forEach(item => {
            total += parseInt(item.price, 10) * item.quantity
        })
        this.setState({total, showTotal: true})
    }

    removeFromCart = id => {
        this.props.dispatch(removeCartItemAction(id))
            .then(() => {
                if (this.props.user.cartDetails.length <= 0) {
                    this.setState({showTotal: false })
                } else {
                    this.calcTotal(this.props.user.cartDetails)
                }
            })
    }

    showNoItemMessage = () => (
        <div className='cart_no_items'>
            <FontAwesomeIcon icon={faFrown}/>
            <div>Cart Is Empty</div>
        </div>
    )

    transactionCancel = () => console.log('transaction cancelled');

    transactionError = (e) => {
        console.log(JSON.stringify(e , null, 2));
    }

    transactionSuccess = (data) => {
        const {dispatch} = this.props;
        dispatch(paymentSuccessAction({
            cartDetails: this.props.user.cartDetails,
            paymentData: data
        }))
        .then(() => {
            if (this.props.user.successBuy) {
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })

    }

    render() {
        return (
            <DashboardNav>
                <div>
                    <h1>My Cart</h1>
                    <div className="user_cart">
                        <CartProductBlock   products={this.props.user}
                                            type='cart'
                                            removeItem={id => this.removeFromCart(id)}/>
                        {this.state.showTotal ?
                            <div>
                                <div className="user_cart_sum">
                                    <div>
                                        Total amount: $ {this.state.total}
                                    </div>
                                </div>
                            </div>
                        :
                            this.state.showSuccess ?
                                <div className='cart_success'>
                                    <FontAwesomeIcon icon={faSmile}/>
                                    <div>Thank You</div>
                                    <div>Your Order Is Complete</div>
                                </div>
                                :
                            this.showNoItemMessage()
                        }
                    </div>
                    {this.state.showTotal &&
                    <div className='paypal_button_container'>
                        <PayPal onSuccess={data => this.transactionSuccess(data)}
                                toPay={this.state.total}
                                transactionCancel={() => this.transactionCancel()}
                                transactionError={e => this.transactionError(e)}/>
                    </div>
                    }
                </div>
            </DashboardNav>
        );
    }
}

// const mapStateToProps = (state, props) => ({
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Cart);

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// }

///////////////////////////////////// BACKGROUND IMAGE /////////////////////////////////////

// import Foo from './images/foo.png';

// style={{background:`white url(${Foo})`}}


///////////////////////////////////// REACT-REVEAL EFFECT /////////////////////////////////////

// import Fade from 'react-reveal/Fade.js';
// import Slide from 'react-reveal/Slide.js';
// import Zoom from 'react-reveal/Zoom.js';

// <Fade delay={500}>...</Fade>
// <Slide left delay={1000}>...</Slide
// <Zoom delay={foo.delay}>...</Zoom>

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageTop from '../UI/PageTop.jsx';
import ProductImage from './ProductImage.jsx';
import ProductInfo from './ProductInfo.jsx';

import {getProductAction, clearProductAction} from "../../actions/productActions";
import {addToCartAction} from "../../actions/cartActions";

class Product extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props
            .dispatch(getProductAction(id))
            .then(res => {
                if (!this.props.products.product) {
                    this.props.history.push('/')
                }
            })
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductAction());
    }

    addToCartHandler = (id) => {
        this.props.dispatch(addToCartAction(id))
    }

    render() {
        return (
            <div>
                <PageTop title='Product Detail'/>
                <div className="container">
                    {this.props.products ?
                    <div className='product_detail_wrapper'>
                        <div className="left">
                            <div style={{width:'500px'}}>
                                <ProductImage product={this.props.products.product}/>
                            </div>
                        </div>
                        <div className="right">
                            <ProductInfo    detail={this.props.products.product}
                                            addToCart={id => this.addToCartHandler(id)}/>
                        </div>
                    </div>
                    : 'loading'}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products
});


export default connect(mapStateToProps)(Product);
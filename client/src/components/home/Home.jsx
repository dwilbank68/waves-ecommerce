import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeSlider from './HomeSlider.jsx';
import HomePromotion from './HomePromotion.jsx';
import CardBlock from '../UI/CardBlock.jsx';

import {
    getProductsByArrivalAction,
    getProductsBySellAction
} from "../../actions/productActions";

// import Home  from './Home .jsx';
class Home  extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getProductsBySellAction())
        dispatch(getProductsByArrivalAction())
    }


    render() {
        const {byArrival, bySell} = this.props.products
        return (
            <div    className="">
                <HomeSlider/>
                <CardBlock  cardList={bySell}
                            title='Best Selling Guitars'/>
                <HomePromotion/>
                <CardBlock  cardList={byArrival}
                            title='New Arrivals'/>
            </div>
        );
    }
}

// const mapStateToProps = (state, props) => ({
const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps)(Home) ;
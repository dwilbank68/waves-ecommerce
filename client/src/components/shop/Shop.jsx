import React, { Component } from 'react';
import PageTop from '../UI/PageTop.jsx';
import { connect } from 'react-redux';

import {getBrandsAction, getProductsToShopAction,
    getWoodsAction} from "../../actions/productActions";

import LoadMoreCards from './LoadMoreCards.jsx';
import CollapsedCheckboxes from '../UI/CollapsedCheckboxes.jsx';
import CollapsedRadio from '../UI/CollapsedRadio.jsx';

import {frets, prices} from '../../constants.js';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

class Shop extends Component {

    state = {
        grid: '',
        limit: 6, skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }
    
    componentDidMount() {
        const {skip, limit, filters} = this.state;
        this.props.dispatch(getBrandsAction());
        this.props.dispatch(getWoodsAction());
        this.props.dispatch(getProductsToShopAction(skip, limit, filters));
    }

    handleFilters = (filters, cat) => {
        const newFilters = {...this.state.filters};
        newFilters[cat] = filters;
        if (cat==='price') {
            let priceValues = this.handlePrice(filters);
            newFilters[cat] = priceValues;
        }
        this.showFilteredResults(newFilters)
        this.setState({filters: newFilters});
    }

    handlePrice = (val) => {
        const data = prices;
        let range = [];
        for (let key in data) {
            if (data[key]._id === parseInt(val, 10)) {
                range = data[key].array
            }
        }
        return range;
    }

    loadMoreCards = () => {
        const {dispatch, products} = this.props;
        let {filters, limit, skip} = this.state;
        skip += limit;
        dispatch(getProductsToShopAction(skip, limit, filters, products.toShop ))
            .then(() => this.setState({skip}))
    }

    showFilteredResults = (filters) => {
        const {limit} = this.state;
        const {dispatch} = this.props;
        dispatch(getProductsToShopAction(0, limit, filters))
            .then(() => this.setState({skip: 0}))
    }

    toggleGrid = () => {
        this.setState({grid: !this.state.grid ? 'grid_bars' : ''})
    }

    render() {
        const {products} = this.props;
        const {grid} = this.state;
        return (
            <div    className="shop">
                <PageTop title='Browse Products'/>
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapsedCheckboxes    initState={true}
                                                    title='Brands'
                                                    list={products.brands}
                                                    handleFilters={(fs) => this.handleFilters(fs, 'brand')}/>
                            <CollapsedCheckboxes    initState={false}
                                                    title='Frets'
                                                    list={frets}
                                                    handleFilters={(fs) => this.handleFilters(fs, 'frets')}/>
                            <CollapsedCheckboxes    initState={false}
                                                    title='Wood'
                                                    list={products.woods}
                                                    handleFilters={(fs) => this.handleFilters(fs, 'wood')}/>
                            <CollapsedRadio     initState={true}
                                                title='Price'
                                                list={prices}
                                                handleFilters={(fs) => this.handleFilters(fs, 'price')}/>
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div    className={`grid_btn ${!grid && 'active'}`}
                                            onClick={() => this.toggleGrid()}>
                                        <FontAwesomeIcon icon={faTh}/>
                                    </div>
                                    <div    className={`grid_btn ${grid && 'active'}`}
                                            onClick={() => this.toggleGrid()}>
                                        <FontAwesomeIcon icon={faBars}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <LoadMoreCards  grid={this.state.grid}
                                                limit={this.state.limit}
                                                size={products.toShopSize}
                                                products={products.toShop}
                                                loadMore={() => this.loadMoreCards()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state, props) => ({
const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps)(Shop);

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

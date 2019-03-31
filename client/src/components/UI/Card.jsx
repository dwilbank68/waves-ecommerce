import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../UI/Button.jsx';

import {addToCartAction} from '../../actions/cartActions';
// import Card from './Card.jsx';
class Card extends Component {
    
    // constructor(props, context){
    //     super(props, context);
    //     this.state = {
    //         whatever:{}
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    // }

    // handleClick(e) {
    //    
    //    this.setState(prevState => {
    //        return {}
    //    })
    // }
       
    /////////// ALTERNATIVE 1 - if using create-react-app

    // and you do not need to init the state based on props
    // state = { whatever: false };
        
    // no more constructor or 'this' binding required
    //
    // handleClick = (e) => {
    //    this.setState(prevState => {
    //        return {}
    //    })
    // }
    

    renderCardImage(images) {
        if (images.length > 0) {
            return images[0].url
        } else {
            return '/images/image_not_available.png'
        }
    }
    
    render() {
        const {brand, description, grid, images, name, price, user, _id} = this.props;
        const url = `url(${ this.renderCardImage(images) }) no-repeat`
        return (
            <div    className={`card_item_wrapper ${grid}`}>
                <div    className="image"
                        style={{background: url}}>
                </div>
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">{brand.name}</div>
                        <div className="name">{name}</div>
                        <div className="price">${price}</div>
                    </div>
                    {grid &&
                    <div className='description'>
                        <p>{description}</p>
                    </div>}
                    <div className='actions'>

                        <div className='button_wrapp'>
                            <Button type='default'
                                    altClass='card_link'
                                    title='View Product'
                                    linkTo={`/product/${_id}`}
                                    addStyles={{margin:'10px 0 0 0'}}/>
                        </div>

                        <div className='button_wrapp'>
                            <Button type='bag_link'
                                    runAction={() => {
                                        user.userData.isAuth ?
                                            this.props.dispatch(addToCartAction(_id))
                                        : console.log('You must log in')
                                    }}/>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

// const mapStateToProps = (state, props) => ({
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Card);

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')
    
// }

///////////////////////////////////// BACKGROUND IMAGE /////////////////////////////////////

// import Foo from './images/foo.png';



///////////////////////////////////// REACT-REVEAL EFFECT /////////////////////////////////////

// import Fade from 'react-reveal/Fade.js';
// import Slide from 'react-reveal/Slide.js';
// import Zoom from 'react-reveal/Zoom.js';

// <Fade delay={500}>...</Fade>
// <Slide left delay={1000}>...</Slide
// <Zoom delay={foo.delay}>...</Zoom>

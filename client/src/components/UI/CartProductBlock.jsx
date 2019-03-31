import React from 'react';
// import PropTypes from 'prop-types';
// import Foo from './images/foo.png';


// import CartProductBlock from './CartProductBlock.jsx';
// const CartProductBlock = (props) => {
const CartProductBlock = ({products, removeItem}) => {

    const renderCartImage = images => {
        if (images.length > 0) {
            return images[0].url
        } else {
            return '/images/image_not_available.png'
        }
    }

    const renderItems = () => (
        products.cartDetails &&
        products.cartDetails.map(p => (
            <div    className='user_product_block'
                    key={p._id}>
                <div className="item">
                    <div    className="image"
                            style={{background:`url(${renderCartImage(p.images)}) no-repeat`}}>
                    </div>
                </div>
                <div className="item">
                    <h4>Product Name</h4>
                    <div>{p.brand.name} {p.name}</div>
                </div>
                <div className="item">
                    <h4>Quantity</h4>
                    <div>{p.quantity}</div>
                </div>
                <div className="item">
                    <h4>Price</h4>
                    <div>$ {p.price}</div>
                </div>
                <div className="item btn">
                    <div    className='cart_remove_btn'
                            onClick={() => removeItem(p._id)}>
                        Remove
                    </div>
                </div>
            </div>
        ))
    )

    return (
        <div    className="cart-product-block">
            {renderItems()}
        </div>
    );
};


// CartProductBlock.defaultProps = {};
// CartProductBlock.propTypes = {
//     name:        PropTypes.string.isRequired,
//     hndleIptChg: PropTypes.func,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({
//          title: PropTypes.string.isRequired,
//          text: PropTypes.string.isRequired
//     }).isRequired,
//     comments:    PropTypes.arrayOf(PropTypes.object),
//     todos:       PropTypes.array,
//     isComplete:  PropTypes.bool,
//     id:          PropTypes.number,
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

export default CartProductBlock;


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
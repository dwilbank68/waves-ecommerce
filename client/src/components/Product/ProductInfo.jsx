import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

import Button from '../UI/Button.jsx';

// import ProductInfo from './ProductInfo.jsx';
// const ProductInfo = (props) => {
const ProductInfo = ({addToCart, detail}) => {

    const showProductActions = detail => (
        <div className='product_actions'>
            <div className="price">$ {detail && detail.price}</div>
            <div className="cart">
                <Button type='add_to_cart_link'
                        runAction={() => addToCart(detail._id)}/>
            </div>
        </div>
    )

    const showProductSpecifications = detail => (
        <div className='product_specifications'>
            <h2>Specifications</h2>
            <div className="item">
                <strong>Frets:</strong> {detail && detail.frets}
            </div>
            <div className="item">
                <strong>Wood:</strong> {detail && detail.wood.name}
            </div>
        </div>
    )

    const showProductTags = detail => (
        <div className='product_tags'>
            {detail && detail.shipping ?
                <div className='tag'>
                    <div><FontAwesomeIcon icon={faTruck}/></div>
                    <div className="tag_text">
                        <div>Free Shipping</div>
                        <div>And Return</div>
                    </div>
                </div>
            : null}
            {detail && detail.available ?
                <div className='tag'>
                    <div><FontAwesomeIcon icon={faCheck}/></div>
                    <div className="tag_text">
                        <div>Available</div>
                        <div>In Store</div>
                    </div>
                </div>
            :
                <div className='tag'>
                    <div><FontAwesomeIcon icon={faTimes}/></div>
                    <div className="tag_text">
                        <div>Not Available</div>
                        <div>Preorder Only</div>
                    </div>
                </div>}
        </div>
    )

    return (
        <div>
            <h1>{detail && detail.brand.name} {detail && detail.name}</h1>
            <p>{detail && detail.description}</p>
            {showProductTags(detail)}
            {showProductActions(detail)}
            {showProductSpecifications(detail)}
        </div>
    );
};


// ProductInfo.defaultProps = {};
// ProductInfo.propTypes = {
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

export default ProductInfo;


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
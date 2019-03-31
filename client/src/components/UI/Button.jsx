import React from 'react';
import {Link} from 'react-router-dom';
// or 'react-router', if version < 4
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

// import Button from './Button.jsx';
// const Button = (props) => {
const Button = ({addStyles, altClass, linkTo='', runAction, title, type}) => {

    const button = () => {
        const link = (
            <Link   className={altClass ? altClass : 'link_default'}
                    to={linkTo}
                    {...addStyles}>
                {title}
            </Link>
        )
        const bag_link = (
            <div    className='bag_link'
                    onClick={runAction}>
                <FontAwesomeIcon icon={faShoppingBag}/>
            </div>
        )
        const add_to_cart_link = (
            <div    className='add_to_cart_link'
                    onClick={runAction}>
                <FontAwesomeIcon icon={faShoppingBag}/>
                Add To Cart
            </div>
        )
        let template = '';
        if (type === 'default') template = link;
        if (type === 'bag_link') template = bag_link;
        if (type === 'add_to_cart_link') template = add_to_cart_link;
        return template;
    }

    return (
        <div    className="my_link">
            {button()}
        </div>
    );
};


// Button.defaultProps = {};
// Button.propTypes = {
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

export default Button;


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
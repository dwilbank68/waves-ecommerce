import React from 'react';
import Slider from 'react-slick';
import Button from '../UI/Button.jsx';


// import HomeSlider from './HomeSlider.jsx';
// const HomeSlider = (props) => {
const HomeSlider = ({whatever1, whatever2}) => {

    const slides = [
        {img:'/images/featured/featured_home.jpg',
            lineOne:'Fender', lineTwo:'Custom Shop',
            linkTitle:'Shop Now', linkTo:'/shop'},
        {img:'/images/featured/featured_home_2.jpg',
            lineOne:'B-Stock', lineTwo:'Awesome Discounts',
            linkTitle:'View Offers', linkTo:'/shop'}
    ]

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    }

    const generateSlides = () => {
        return slides ?
            slides.map((slide, i) => (
                <div key={i}>
                    <div    className="featured_image"
                            style={{
                                background:`url(${slide.img})`,
                                height: `${window.innerHeight}px`
                            }}>
                        <div className="featured_action">
                            <div className="tag title">{slide.lineOne}</div>
                            <div className="tag low_title">{slide.lineTwo}</div>
                            <div>
                                <Button type='default'
                                        title={slide.linkTitle}
                                        linkTo={slide.linkTo}
                                        addStyles={{margin:'10px 0 0 0'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            ) )
        : null
    }

    return (
        <div    className="featured_container">
            <Slider {...settings}>
                {generateSlides()}
            </Slider>

        </div>
    );
};


// HomeSlider.defaultProps = {};
// HomeSlider.propTypes = {
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

export default HomeSlider;


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
import React from 'react';
// import PropTypes from 'prop-types';
import CardBlockShop from '../UI/CardBlockShop.jsx';


// import LoadMoreCards from './LoadMoreCards.jsx';
// const LoadMoreCards = (props) => {
const LoadMoreCards = ({grid, limit, loadMore, products, size}) => {

    return (
        <div>
            <div>
                <CardBlockShop  grid={grid}
                                list={products}/>
            </div>
            {size > 0 && size >= limit ?
                <div className="load_more_container">
                    <span onClick={() => loadMore()}>
                        Load More
                    </span>
                </div>
            : null}
        </div>
    );
};



export default LoadMoreCards;


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
import React from 'react';
import Card from './Card.jsx';

// const styles = {
//     display: 'flex',
//     flexWrap: 'wrap'
// }

const CardBlockShop = ({list, grid}) => {


    const renderCards = () => (
        list && list.map((card) => (
            <Card key={card._id}
                  {...card}
                  grid={grid}/>
        ))
    )

    return (
        <div    className="card_block_shop">
            <div>
                <div>
                    {list ?
                        list.length === 0 ?
                            <div className='no_result'>
                                Sorry, no results
                            </div>
                        : null
                    : null}
                    {renderCards(list)}
                </div>
            </div>
        </div>
    );
};


// CardBlockShop.defaultProps = {};
// CardBlockShop.propTypes = {
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

export default CardBlockShop;


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
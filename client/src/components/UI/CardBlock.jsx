import React from 'react';
import Card from './Card.jsx';

const styles = {
    display: 'flex',
    flexWrap: 'wrap'
}

const CardBlock = ({cardList, title}) => {

    const renderCards = () => (
        cardList && cardList.map((card, i) => (
            <Card key={i} {...card}/>
        ))
    )

    return (
        <div    className="card_block">
            <div className="container">
                {title && <div className='title'>{title}</div>}
                <div style={styles}>
                    {renderCards(cardList)}
                </div>
            </div>
        </div>
    );
};


// CardBlock.defaultProps = {};
// CardBlock.propTypes = {
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

export default CardBlock;


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
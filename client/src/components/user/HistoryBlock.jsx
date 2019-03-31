import React from 'react';
import moment from 'moment';


// import HistoryBlock from './HistoryBlock.jsx';
// const HistoryBlock = (props) => {
const HistoryBlock = ({history}) => {

    const renderBlocks = () => (
        history ?
            history.map((h,i) => (
                <tr key={i}>
                    <td>{moment(h.dateOfPurchase).format("MM-DD-YYYY")}</td>
                    <td>{h.brand} {h.name}</td>
                    <td>$ {h.price}</td>
                    <td>{h.quantity}</td>
                </tr>
            ))
        :null
    )

    return (
        <div    className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Date Of Purchase</th>
                        <th>Product</th>
                        <th>Price Paid</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
    );
};


// HistoryBlock.defaultProps = {};
// HistoryBlock.propTypes = {
//     history:        PropTypes.string.isRequired,
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

export default HistoryBlock;


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
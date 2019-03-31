import React from 'react';

import Button from '../UI/Button.jsx';
import Login from './Login.jsx';

// import RegisterLogin from './RegisterLogin.jsx';
// const RegisterLogin = (props) => {
const RegisterLogin = ({whatever1, whatever2}) => {


    return (
        <div    className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customers</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda deleniti ex. Architecto fugit iste obcaecati, quo totam voluptatibus. Aperiam cum eligendi fugiat id incidunt nesciunt nostrum possimus quam quasi?</p>
                        <Button type='default'
                                title='Create An Account'
                                linkTo='/register'
                                addStyles={{margin:'10px 0 0 0'}}/>
                    </div>
                    <div className="right">
                        <h2>Registered Customers</h2>
                        <p>If you have an account please log in</p>
                        <Login/>
                    </div>
                </div>
            </div>
        </div>
    );
};


// RegisterLogin.defaultProps = {};
// RegisterLogin.propTypes = {
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

export default RegisterLogin;


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
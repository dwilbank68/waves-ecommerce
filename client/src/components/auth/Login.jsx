import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import FormField from '../UI/FormField.jsx';
import {isFormValid, makeFormData, update} from '../utils/formUtils.js';
import {loginUserAction} from '../../actions/userActions.js';

class Login extends Component {

    state = {
        formError: false,
        formSuccess:'',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:' '
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:' '
            }
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        const {dispatch, history} = this.props;
        let dataToSubmit = makeFormData(this.state.formData, 'login');
        let formIsValid = isFormValid(this.state.formData, 'login');
        if (formIsValid) {
            dispatch(loginUserAction(dataToSubmit))
                .then(res => {
                    if (res.payload.loginSuccess) {
                        console.log(res.payload);
                        history.push('/user/dashboard')
                    } else {
                        this.setState({formError: true})
                    }
                })
        } else {
            this.setState({formError: true})
        }
        // this.setState({
        //     formError: false,
        //     formData: newFormData
        // })
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'login');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }



    render() {
        const {formData} = this.state;
        return (
            <div    className="signin_wrapper">
                <form >
                {/*<form onSubmit={e => this.submitForm(e)}>*/}
                    <FormField  id={'email'}
                                formData={formData.email}
                                change={e => this.updateForm(e)}/>
                    <FormField  id={'password'}
                                formData={formData.password}
                                change={e => this.updateForm(e)}/>
                    {this.state.formError ?
                        <div className='error_label'>Please check your data</div>
                    :null}
                    <button onClick={e => this.submitForm(e)}>
                        Log In
                    </button>
                </form>
            </div>
        );
    }
}

// Login.defaultProps = {};
// Login.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// Login.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default connect()(withRouter(Login));

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// }

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

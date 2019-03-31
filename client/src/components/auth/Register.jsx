import React, { Component } from 'react';
import {connect} from 'react-redux';

import Dialog from '@material-ui/core/Dialog';

import FormField from '../UI/FormField.jsx';
import {isFormValid, makeFormData, update} from '../utils/formUtils.js';
import {registerUserAction} from '../../actions/userActions.js';

class Register extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: { required: true },
                valid: false,
                touched: false,
                validationMessage:' '
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    lastname: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your last name'
                },
                validation: { required: true },
                valid: false,
                touched: false,
                validationMessage:' '
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: { required: true, email: true },
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
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
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
        let dataToSubmit = makeFormData(this.state.formData, 'register');
        let formIsValid = isFormValid(this.state.formData, 'register');
        if (formIsValid) {
            dispatch(registerUserAction(dataToSubmit))
                .then(res => {
                    if (res.payload.success) {
                        this.setState({
                            formError: false,
                            formSuccess: true
                        })
                        setTimeout(() => {
                            history.push('/register_login')
                        }, 3000);
                    } else {
                        this.setState({formError: true})
                    }
                })
                .catch(e => this.setState({formError: true}))
        } else {
            this.setState({formError: true})
        }
        // this.setState({
        //     formError: false,
        //     formData: newFormData
        // })
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'register');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }



    render() {
        const {formData} = this.state;
        return (
            <div    className="page_wrapper">
                <div className="container">
                    <div className="register-login_container">
                        <div className="left">
                            <form onSubmit={e => this.submitForm(e)}>
                                <h2>Personal Information</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField  id={'name'}
                                                    formData={formData.name}
                                                    change={e => this.updateForm(e)}/>
                                    </div>
                                    <div className="block">
                                        <FormField  id={'lastname'}
                                                    formData={formData.lastname}
                                                    change={e => this.updateForm(e)}/>
                                    </div>
                                </div>
                                <div>
                                    <FormField  id={'email'}
                                                formData={formData.email}
                                                change={e => this.updateForm(e)}/>
                                </div>
                                <h2>Verify Password</h2>
                                <div className='form_block_two'>
                                    <div className="block">
                                        <FormField  id={'password'}
                                                    formData={formData.password}
                                                    change={e => this.updateForm(e)}/>
                                    </div>
                                    <div className="block">
                                        <FormField  id={'confirmPassword'}
                                                    formData={formData.confirmPassword}
                                                    change={e => this.updateForm(e)}/>
                                    </div>
                                </div>
                                <div>
                                    {this.state.formError ?
                                        <div className='error_label'>Please check your data</div>
                                        :null}
                                    <button onClick={e => this.submitForm(e)}>
                                        Create An Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Dialog open={this.state.formSuccess}>
                    <div className='dialog_alert'>
                        <div>Congratulations</div>
                        <div>Redirecting to Login in several seconds...</div>
                    </div>
                </Dialog>

            </div>
        );
    }
}

// Register.defaultProps = {};
// Register.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// Register.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default connect()(Register);

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

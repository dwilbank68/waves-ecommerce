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
                    <button onClick={e => this.props.history.push('/forgot_password')}
                            style={{marginLeft:'10px'}}>
                        Forgot My Password
                    </button>
                </form>
            </div>
        );
    }
}

export default connect()(withRouter(Login));
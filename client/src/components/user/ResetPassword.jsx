import React, { Component } from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';

import {isFormValid, makeFormData, update} from '../utils/formUtils.js';
import FormField from '../UI/FormField.jsx';


class ResetPassword extends Component {

    state = {
        resetToken:'',
        formError: false,
        formErrorMessage: '',
        formSuccess: '',
        formData: {
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

    componentDidMount() {
        const {token} = this.props.match.params;
        this.setState({resetToken: token})
    }


    submitForm = (e) => {
        e.preventDefault();
        let dataToSubmit = makeFormData(this.state.formData, 'reset_password');
        let formIsValid = isFormValid(this.state.formData, 'reset_password');
        if (formIsValid) {
            axios.post(
                '/api/users/reset_password',
                {...dataToSubmit, resetToken:this.state.resetToken}
            )
            .then((res) => {
                if (res.data.success) {
                    this.setState({formError: false, formSuccess:true});
                    setTimeout(() => {
                        this.props.history.push('/register_login')
                    }, 3000);
                } else {
                    this.setState({formError: true, formErrorMessage:res.data.message})
                }
            })
        } else {
            this.setState({formError: true})
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'reset_password');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    render() {
        const {formData} = this.state;
        return (
            <div    className="container">
                <form onSubmit={e => this.submitForm(e)}>
                    <h2>Reset Password</h2>
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
                        {/*{this.state.formSuccess &&*/}
                        {/*<div className='form_success'>Success. Check your email.</div>}*/}
                        {this.state.formError &&
                        <div className='error_label'>
                            {this.state.formErrorMessage}
                        </div>}
                        <button onClick={e => this.submitForm(e)}>
                            Reset Password
                        </button>
                    </div>
                </form>

                <Dialog open={this.state.formSuccess}>
                    <div className='dialog_alert'>
                        <div>Congratulations</div>
                        <div>Password successfully reset - Redirecting to Login...</div>
                    </div>
                </Dialog>

            </div>
        );
    }
}


export default ResetPassword;

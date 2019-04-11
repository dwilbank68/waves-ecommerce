import React, { Component } from 'react';
import axios from 'axios';

import {isFormValid, makeFormData, update} from '../utils/formUtils.js';
import FormField from '../UI/FormField.jsx';
import {loginUserAction} from "../../actions/userActions";


class ForgotPassword extends Component {

    state = {
        formError: false,
        formSuccess: '',
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
                validationMessage: ' '
            }
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        let dataToSubmit = makeFormData(this.state.formData, 'forgot_password');
        let formIsValid = isFormValid(this.state.formData, 'forgot_password');
        if (formIsValid) {
            axios.post('/api/users/forgot_password', dataToSubmit)
                .then((res) => {
                    if (res.data.success) {
                        this.setState({formSuccess: true})
                    }
                })
        } else {
            this.setState({formError: true})
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'forgot_password');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    render() {
        return (
            <div    className="container">
                <h1>Forgot Password?</h1>
                <form onSubmit={e => this.submitForm(e)}>
                    <FormField  id={'email'}
                                formData={this.state.formData.email}
                                change={e => this.updateForm(e)}/>

                    <div>
                        {this.state.formSuccess &&
                        <div className='form_success'>Success. Check your email.</div>}
                        {this.state.formError &&
                        <div className='error_label'>Please check your data</div>}
                        <button onClick={e => this.submitForm(e)}>
                            Create An Account
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}


export default ForgotPassword;

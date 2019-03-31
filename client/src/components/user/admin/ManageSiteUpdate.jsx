import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../UI/FormField.jsx';
import {isFormValid, makeFormData, populateFields, update} from '../../utils/formUtils.js';
import {getSiteDataAction, updateSiteDataAction} from "../../../actions/siteActions";

class ManageSiteUpdate extends Component {

    state = {
        formError: false,
        formSuccess:'',
        formData: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'site address'
                },
                showLabel: true,
                validation: { required: true },
                valid: false,
                touched: false,
                validationMessage:''
            },
            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Working Hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'working hours'
                },
                showLabel: true,
                validation: { required: true },
                valid: false,
                touched: false,
                validationMessage:''
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone Number',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'phone number'
                },
                showLabel: true,
                validation: { required: true },
                valid: false,
                touched: false,
                validationMessage:''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                showLabel: true,
                touched: false,
                validationMessage:' '
            },
        }
    }

    componentDidMount() {
        this.props.dispatch(getSiteDataAction())
            .then(() => {
                const {formData} = this.state;
                const {siteData} = this.props.site;
                const newFormData = populateFields(formData, siteData[0])
                this.setState({formData: newFormData})
            })
    }


    submitForm = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        let dataToSubmit = makeFormData(this.state.formData, 'site_info');
        let formIsValid = isFormValid(this.state.formData, 'site_info');
        if (formIsValid) {
            console.log('------------------------------------------');
            console.log('dataToSubmit ',dataToSubmit);
            console.log('------------------------------------------');
            dispatch(updateSiteDataAction(dataToSubmit))
                .then(res => {
                    this.setState(
                        {formSuccess: true},
                        () => setTimeout(() => this.setState({formSuccess: false}), 2000)
                    )
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
        const newFormData = update(element, this.state.formData, 'site_info');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    render() {
        const {formData} = this.state;
        return (
            <div>
                <form onSubmit={e => this.submitForm(e)}>

                        <h1>Site Info</h1>

                        <FormField  id={'address'}
                                    formData={formData.address}
                                    change={e => this.updateForm(e)}/>

                        <FormField  id={'hours'}
                                    formData={formData.hours}
                                    change={e => this.updateForm(e)}/>

                        <FormField  id={'phone'}
                                    formData={formData.phone}
                                    change={e => this.updateForm(e)}/>

                        <FormField  id={'email'}
                                    formData={formData.email}
                                    change={e => this.updateForm(e)}/>

                    <div>
                        {this.state.formSuccess &&
                        <div className='form_success'>Success</div>}

                        {this.state.formError &&
                        <div className='error_label'>Please check your data</div>}

                        <button onClick={e => this.submitForm(e)}>
                            Update Site Info
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

// const mapStateToProps = (state, props) => ({
const mapStateToProps = state => ({
    site: state.site
});

export default connect(mapStateToProps)(ManageSiteUpdate);

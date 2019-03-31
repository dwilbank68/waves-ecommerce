import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../UI/FormField.jsx';
import {isFormValid, makeFormData, populateFields, update} from '../utils/formUtils.js';
import {clearUpdateUserAction, updateUserAction} from "../../actions/userActions.js";

// import UpdatePersonalInfo from './UpdatePersonalInfo.jsx';
class UpdatePersonalInfo extends Component {
    
    state = {
        formError: false,
        formSuccess:'',
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
            }
        }
    }

    componentDidMount() {
        const {formData} = this.state;
        const {userData} = this.props.user;
        const newFormData = populateFields(formData, userData);
        this.setState({formData: newFormData})
    }


    submitForm = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        let dataToSubmit = makeFormData(this.state.formData, 'update_user');
        let formIsValid = isFormValid(this.state.formData, 'update_user');
        // let existingBrands = this.props.products.brands;
        if (formIsValid) {
            dispatch(updateUserAction(dataToSubmit))
                .then(() => {
                    if (this.props.user.updateUser.success) {
                        this.setState({
                            formSuccess:true
                        }, () => {
                            setTimeout(() => {
                                this.props.dispatch(clearUpdateUserAction());
                                this.setState({formSuccess: false})
                            }, 2000)
                        })
                    } else {
                        this.setState({formError: true})
                    }
                })
        } else {
            this.setState({formError: true})
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'update_user');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }
    
    render() {
        const {formData, formError, formSuccess} = this.state;
        return (
            <div    className="">
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

                    <div>
                        {formSuccess &&
                        <div className='form_success'>Success</div>}
                        {formError &&
                        <div className='error_label'>Please check your data</div>}
                        <button onClick={e => this.submitForm(e)}>
                            Update User Info
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

// const mapStateToProps = (state, props) => ({
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(UpdatePersonalInfo);

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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../UI/FormField.jsx';
import {isFormValid, makeFormData, resetFields, update} from '../../utils/formUtils.js';
import {addWoodAction, getWoodsAction} from "../../../actions/productActions";

class ManageWoods extends Component {

    state = {
        formError: false,
        formSuccess:'',
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'wood_input',
                    type: 'text',
                    placeholder: 'Enter the wood'
                },
                validation: { required: true },
                valid: false,
                touched: false,
                validationMessage:' '
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(getWoodsAction())
    }

    resetFields = () => {
        const newFormData = resetFields(this.state.formData, 'brands');
        this.setState({
            formData: newFormData,
            formSuccess: true
        })
    }

    showCategories = () => (
        this.props.products.woods &&
        this.props.products.woods.map(b => (
            <div    className='category_item'
                    key={b._id}>
                {b.name}
            </div>
        ))
    )

    submitForm = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        let dataToSubmit = makeFormData(this.state.formData, 'woods');
        let formIsValid = isFormValid(this.state.formData, 'woods');
        let existingWoods = this.props.products.woods;
        if (formIsValid) {
            dispatch(addWoodAction(dataToSubmit, existingWoods))
                .then(res => {
                    if (res.payload.success) {
                        this.resetFields();
                    } else {
                        this.setState({formError: true})
                    }
                })
        } else {
            this.setState({formError: true})
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'brands');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    render() {
        const {formData} = this.state;
        return (
            <div    className="admin_category_wrapper">
                <h1>Woods</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategories()}
                        </div>
                    </div>
                    <div className="right">

                        <form>

                            <FormField  id={'name'}
                                        formData={formData.name}
                                        change={e => this.updateForm(e)}/>

                            {this.state.formSuccess &&
                            <div className='form_success'>Success</div>}

                            {this.state.formError &&
                            <div className='error_label'>Please check your data</div>}

                            <button onClick={e => this.submitForm(e)}>
                                Add Wood
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps)(ManageWoods);
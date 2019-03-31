import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardNav from '../../hoc/DashboardNav.jsx';
import FormField from '../../UI/FormField.jsx';
import FileUpload from '../../UI/FileUpload.jsx';
import {addSelectOptions, isFormValid, makeFormData, resetFields, update} from '../../utils/formUtils.js';
import {addProductAction, deleteProductAction, getBrandsAction, getWoodsAction} from "../../../actions/productActions";


class AddProduct extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product Name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {required: true},
                valid: false, touched: false, validationMessage: '',
                showLabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product Description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Add a description'
                },
                validation: {required: true},
                valid: false, touched: false, validationMessage: '',
                showLabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product Price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter price'
                },
                validation: {required: true},
                valid: false, touched: false, validationMessage: '',
                showLabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Brand',
                    name: 'brand_input',
                    options: []
                },
                validation: {required: true},
                valid: false, touched: false, validationMessage: '',
                showLabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Wood',
                    name: 'wood_input',
                    options: []
                },
                validation: {required: true},
                valid: false, touched: false, validationMessage: '',
                showLabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frets',
                    name: 'frets_input',
                    options: [
                        {key:20, value:20},
                        {key:21, value:21},
                        {key:22, value:22},
                        {key:24, value:24}
                    ]
                },
                validation: {required: true},
                valid: false, touched: false, validationMessage: '',
                showLabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shipping_input',
                    options: [
                        {key:true, value:'Yes'},
                        {key:false, value:'No'}
                    ]
                },
                validation: {required: true},
                valid: false, touched: false, validationMessage: '',
                showLabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available, in stock',
                    name: 'available_input',
                    options: [
                        {key:true, value:'Yes'},
                        {key:false, value:'No'}
                    ]
                },
                validation: {required: true},
                valid: false, touched: false, validationMessage: '',
                showLabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish',
                    name: 'publish_input',
                    options: [
                        {key:true, value:'Public'},
                        {key:false, value:'Hidden'}
                    ]
                },
                validation: {required: true},
                valid: false, touched: false, validationMessage: '',
                showLabel: true
            },
            images: {
                value: [],
                validation: {required: false},
                valid: true, touched: false, validationMessage: '',
                showLabel: false
            }
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const {formData} = this.state
        dispatch(getBrandsAction())
            .then(res => {
                const {brands} = this.props.products;
                const newFormData = addSelectOptions(formData, brands, 'brand');
                this.updateFields(newFormData);
            })
        dispatch(getWoodsAction())
            .then(res => {
                const {woods} = this.props.products;
                const newFormData = addSelectOptions(formData, woods, 'wood');
                this.updateFields(newFormData);
            })
    }

    formSuccess = () => {}

    imagesHandler = (imgs) => {
        const newFormData = { ...this.state.formData };
        newFormData['images'].value = imgs;
        newFormData['images'].valid = true;
        this.setState({formData: newFormData})
    }

    resetFields = () => {
        const newFormData = resetFields(this.state.formData, 'products')
        this.setState({
            formData: newFormData,
            formSuccess:true
        })
        setTimeout(() => {
            this.setState({formSuccess: false}, () => this.props.dispatch(deleteProductAction()))
        }, 3000);
    }

    submitForm = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        let dataToSubmit = makeFormData(this.state.formData, 'products');
        let formIsValid = isFormValid(this.state.formData, 'products');
        if (formIsValid) {
            dispatch(addProductAction(dataToSubmit))
                .then(() => {
                    const {success} = this.props.products.addProduct;
                    if (success) {
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
        const newFormData = update(element, this.state.formData, 'products');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    updateFields = (newFormData) => {
        this.setState({formData: newFormData})
    }

    render() {
        const {formData} = this.state;
        return (
            <DashboardNav>
                <div    className="">
                    <h1>Add Product</h1>
                    <form onSubmit={e => this.submitForm(e)}>

                        <FileUpload imagesHandler={(images) => this.imagesHandler(images)}
                                    reset={this.state.formSuccess}/>

                        <FormField  id={'name'}
                                    formData={formData.name}
                                    change={e => this.updateForm(e)}/>
                        <FormField  id={'description'}
                                    formData={formData.description}
                                    change={e => this.updateForm(e)}/>
                        <FormField  id={'price'}
                                    formData={formData.price}
                                    change={e => this.updateForm(e)}/>

                        <div className='form_divider'></div>

                        <FormField  id={'brand'}
                                    formData={formData.brand}
                                    change={e => this.updateForm(e)}/>

                        <FormField  id={'shipping'}
                                    formData={formData.shipping}
                                    change={e => this.updateForm(e)}/>

                        <FormField  id={'available'}
                                    formData={formData.available}
                                    change={e => this.updateForm(e)}/>

                        <div className='form_divider'></div>

                        <FormField  id={'wood'}
                                    formData={formData.wood}
                                    change={e => this.updateForm(e)}/>

                        <FormField  id={'frets'}
                                    formData={formData.frets}
                                    change={e => this.updateForm(e)}/>

                        <div className='form_divider'></div>

                        <FormField  id={'publish'}
                                    formData={formData.publish}
                                    change={e => this.updateForm(e)}/>

                        {this.state.formSuccess ?
                            <div className='form_success'>Success</div>
                        :null}

                        {this.state.formError ?
                            <div className='error_label'>Please check your data</div>
                        :null}

                        <button onClick={e => this.submitForm(e)}>
                            Add Product
                        </button>

                    </form>
                </div>
            </DashboardNav>
        );
    }
}

// const mapStateToProps = (state, props) => ({
const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps)(AddProduct);

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

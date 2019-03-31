import React from 'react';
// import PropTypes from 'prop-types';
// import Foo from './images/foo.png';


// import FormField from './FormField.jsx';
// const FormField = (props) => {
const FormField = ({change, formData, id}) => {

    const renderTemplate = () => {
        let formTemplate = null;
        const input = (
            <div className='formBlock'>
                {formData.showLabel ?
                    <div className='label_inputs'>{formData.config.label}</div>
                : null}
                <input  {...formData.config}
                        value={formData.value}
                        onBlur={event => change({event, id, blur: true})}
                        onChange={event => change({event, id})}/>
                {showError()}
            </div>
        )
        const select = (
            <div className='formBlock'>
                {formData.showLabel ?
                    <div className='label_inputs'>{formData.config.label}</div>
                : null}
                <select     value={formData.value}
                            onBlur={event => change({event, id, blur: true})}
                            onChange={event => change({event, id})}>
                    <option value=''>Select One</option>
                    {
                        formData.config.options && formData.config.options.map(item => (
                            <option key={item.key}
                                    value={item.key}>
                                {item.value}
                            </option>
                        ))
                    }
                </select>
                {showError()}
            </div>
        )
        const textarea = (
            <div className='formBlock'>
                {formData.showLabel ?
                    <div className='label_inputs'>{formData.config.label}</div>
                    : null}
                <textarea  {...formData.config}
                            value={formData.value}
                            onBlur={event => change({event, id, blur: true})}
                            onChange={event => change({event, id})}/>
                {showError()}
            </div>
        )
        // formTemplate = formData.element === 'input' ? input : null
        if (formData.element === 'input') formTemplate = input;
        if (formData.element === 'textarea') formTemplate = textarea;
        if (formData.element === 'select') formTemplate = select;
        return formTemplate;
    }

    const showError = () => {
        let errorMessage = null;
        if (formData.validation && !formData.valid) {
            errorMessage = (
                <div className='error_label'>
                    {formData.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }

    return (
        <div    className="form-field">
            {renderTemplate()}
        </div>
    );
};


// FormField.defaultProps = {};
// FormField.propTypes = {
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

export default FormField;


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
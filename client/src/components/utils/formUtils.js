export const
addSelectOptions = (formData, optionArr=[], fieldName) => {
    const arr = [];
    const newFormData = {...formData};
    optionArr.forEach(o => arr.push({key:o._id, value:o.name}))
    newFormData[fieldName].config.options = arr;
    return newFormData;
}

export const
isFormValid = (formData, formName) => {
    let formValid = true;
    for (let key in formData) {
        formValid = formData[key].valid && formValid;
    }
    return formValid;
}

export const
makeFormData = (formData, formName) => {
    let data = {};
    for (let key in formData) {
        if (key!== 'confirmPassword') {
            data[key] = formData[key].value;
        }
    }
    return data;
}

export const
populateFields = (formData, fields) => {
    for (let key in formData) {
        formData[key].value=fields[key];
        formData[key].valid=true;
        formData[key].touched=true;
        formData[key].validationMessage='';
    }
    return formData;
}

export const
resetFields = (formData, formName) => {
    const newFormData = {...formData};
    for (let key in newFormData) {
        newFormData[key].value = key === 'images' ? [] : '';
        newFormData[key].valid = false;
        newFormData[key].touched = false;
        newFormData[key].validationMessage = '';
    }
    return newFormData;
}

export const
update = (element, formData, formName) => {
    
    const newFormData = {
        ...formData
    }
    const newElement = {
        ...newFormData[element.id]
    }
    newElement.value = element.event.target.value;
    if (element.blur) {
        let validation = validate(newElement, formData);
        newElement.valid = validation.valid;
        newElement.validationMessage = validation.message;
    }
    newElement.touched = element.blur;
    newFormData[element.id] = newElement;
    return newFormData;
}

export const
validate = (element, formData=[]) => {
    const {confirm, email, required} = element.validation;
    let validation = {valid:true, message:''};
    if (email) {
        const valid = /\S+@\S+\.\S+/.test(element.value.trim());
        if (!valid) validation = {valid:false, message:'Must be a valid email'};
    }
    if (confirm) {
        const valid = element.value.trim() === formData[confirm].value;
        if (!valid) validation = {valid:false, message:'Passwords Must Match'};
    }
    if (required) {
        const valid = element.value.trim() !== '';
        if (!valid) validation = {valid:false, message:'This field is required'};
    }
    return validation;
}
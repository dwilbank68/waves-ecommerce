const mongoose = require("mongoose");
const {Schema} = mongoose;

const brandSchema = new Schema({
    name: {
        type: String,
        maxLength: 100,
        required: true,
        unique: 1
    }
});







// const User = mongoose.model('User', brandSchema);
// module.exports = {User};
// ----------- NOTE ------------
// Using module.exports, then requiring it in elsewhere can confuse
// certain testing frameworks.
// Instead, bring this in elsewhere using
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
mongoose.model('Brand', brandSchema);
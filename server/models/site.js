const mongoose = require("mongoose");
const {Schema} = mongoose;

const siteSchema = new Schema({
    featured: {
        type: Array,
        required: true,
        default: []
    },
    siteInfo: {
        type: Array,
        required: true,
        default: []
    }
});







// const User = mongoose.model('User', siteSchema);
// module.exports = {User};
// ----------- NOTE ------------
// Using module.exports, then requiring it in elsewhere can confuse
// certain testing frameworks.
// Instead, bring this in elsewhere using
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
mongoose.model('Site', siteSchema);
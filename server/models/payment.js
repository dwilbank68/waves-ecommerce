const mongoose = require("mongoose");
const {Schema} = mongoose;

const paymentSchema = new Schema({
    user: {
        type: Array,
        default: [],
    },
    data: {
        type: Array,
        default: [],
    },
    products: {
        type: Array,
        default: [],
    }
},
{ timestamps: true }
);

// const User = mongoose.model('User', brandSchema);
// module.exports = {User};
// ----------- NOTE ------------
// Using module.exports, then requiring it in elsewhere can confuse
// certain testing frameworks.
// Instead, bring this in elsewhere using
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
mongoose.model('Payment', paymentSchema);
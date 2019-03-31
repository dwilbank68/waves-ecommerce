const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    name: {
        type: String, required: true,
        maxLength: 100,
        unique: 1
    },
    description: {
        type: String, required: true,
        maxLength: 10000,
    },
    price: {
        type: Number, required: true,
        maxLength: 255,
    },
    brand: {
        type: Schema.Types.ObjectId, required: true,
        ref: 'Brand',
    },
    wood: {
        type: Schema.Types.ObjectId, required: true,
        ref: 'Wood',
    },
    frets: { type: Number, required: true },
    images: { type: Array, default: [] },
    publish: { type: Boolean, required: true },
    shipping: { type: Boolean, required: true },
    sold: {type: Number, default: 0, maxLength: 1000 },
    available: { type: Boolean, required: true }
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
mongoose.model('Product', productSchema);
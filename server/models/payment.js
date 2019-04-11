const mongoose = require("mongoose");
const {Schema} = mongoose;

const paymentSchema = new Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    products: {
        type: Array,
        default: []
    }
});


mongoose.model('Payment', paymentSchema);
const mongoose = require("mongoose");
const {Schema} = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment');
const SALT_1 = 10;
require('dotenv').config();

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        match: /.+@.+\..+/,
        trim: true,
        lowercase: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    cart: { type: Array, default:[] },
    history: { type: Array, default:[] },
    role: { type: Number, default: 0 },
    token: String,
    resetToken: {type:String},
    resetTokenExp: {type:Number}
});

userSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_1, function(err, salt){
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
})
//
userSchema.methods.comparePassword = function(pw, cb) {
    const user = this;
    bcrypt.compare(pw, user.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.statics.findByToken = function(token, cb) {
    const {SECRET} = process.env;
    let user = this;
    jwt.verify(token, SECRET, function(err, decoded){
        user.findOne({'_id':decoded, token}, function(err, user){
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

userSchema.methods.generateResetToken = function(cb) {
    let user = this;
    crypto.randomBytes(20, (err, buffer) => {
        const token = buffer.toString('hex');
        // const today = moment().startOf('day').valueOf();
        // const tomorrow = moment().endOf('day').valueOf();
        const sixHours = moment().add(6, 'hours').valueOf();
        user.resetToken = token;
        user.resetTokenExp = sixHours;
        user.save((err, user) => {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

userSchema.methods.generateToken = function(cb) {
    let user = this;
    const {SECRET} = process.env;
    const token = jwt.sign(user._id.toHexString(), SECRET);
    user.token = token;
    user.save( function(err, user){
        if (err) return cb(err);
        cb(null, user);
    })
}
// const User = mongoose.model('User', userSchema);
// module.exports = {User};
// ----------- NOTE ------------
// Using module.exports, then requiring it in elsewhere can confuse
// certain testing frameworks.
// Instead, bring this in elsewhere using
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
mongoose.model('User', userSchema);
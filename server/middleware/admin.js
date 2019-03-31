// const {User} = require('../models/user.js');
const mongoose = require('mongoose');

const User = mongoose.model('User');

let admin = (req,res,next) => {
    if (req.user.role === 0) {
        return res.send('admin only')
    }
    next()
}

module.exports = {admin}
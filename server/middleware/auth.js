// const {User} = require('../models/user.js');
const mongoose = require('mongoose');

const User = mongoose.model('User');

let auth = (req,res,next) => {
    let token = req.cookies.waves_auth;
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({isAuth: false, error: true});
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth}
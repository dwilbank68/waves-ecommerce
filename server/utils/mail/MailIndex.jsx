require('dotenv').config();

const mailer = require('nodemailer');
const {purchase} = require('./purchase_template');
const {welcome} = require('./welcome_template');
const {resetPassword} = require('./resetpass_template');

const createEmailObj = (to, recipName, token, type, transactionData) => {
    let data = null;
    switch(type) {
        case 'welcome':
            data = {
                from: 'Waves <wilbankscoding@gmail.com>',
                to, subject: `Welcome To Waves, ${recipName}`,
                html: welcome()
            }
        break;
        case 'purchase':
            data = {
                from: 'Waves <wilbankscoding@gmail.com>',
                to, subject: `Thanks For Shopping With us, ${recipName}`,
                html: purchase(transactionData)
            }
        break;
        case 'reset_password':
            data = {
                from: 'Waves <wilbankscoding@gmail.com>',
                to, subject: `Hi ${recipName}, reset your password`,
                html: resetPassword(transactionData)
            }
            // transactionData is the user object containing the token
        break;
        default: data;
    }
    return data;
}

const sendEmail = (address, recipName, token, type, transactionData = null) => {

    const smtpTransport = mailer.createTransport({
        service: 'Gmail',
        auth: {user:'wilbankscoding@gmail.com', pass: process.env.EMAIL_PASS}
    })

    const mailObj = createEmailObj(address, recipName, token, type, transactionData)
    
    smtpTransport
        .sendMail(
            mailObj,
            (err, res) => {
                if (err) console.log(err);
                smtpTransport.close();
            }
        )
}

module.exports = {sendEmail};



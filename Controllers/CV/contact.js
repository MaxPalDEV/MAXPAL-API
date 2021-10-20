/** 
 * IMPORTS
*/
const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Envoi du formulaire de contact vers le mail
 */
 exports.sendMail = (req, res, next) => {
    var transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure:true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    var mailOptions = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_RECEIVER,
        subject: '[PM.me] Nouveau message depuis le formulaire de contact',
        html: '<h1>' + req.body.name + '</h1> - <h2>' + req.body.email + '</h2> <br> <br> <center>'+ req.body.subject + '</center> <br> <p>' + req.body.content + '</p>'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error);
        }else{
            console.log("Email sent: " + info.response);
            console.log(req.body)
        }
    })
};
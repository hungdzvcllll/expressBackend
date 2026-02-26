"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
var MailService = (function () {
    function MailService() {
    }
    MailService.prototype.sendEmail = function (mailTo, code) {
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hungb1577@gmail.com',
                pass: 'qvkn tvqw pstg ctii'
            }
        });
        var mailOptions = {
            from: 'hungb1577@gmail.com',
            to: mailTo,
            subject: 'RegisterCode',
            text: code
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    };
    return MailService;
}());
exports.MailService = MailService;
exports.default = MailService;
//# sourceMappingURL=MailService.js.map
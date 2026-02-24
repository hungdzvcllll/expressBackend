"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
class MailService {
    sendEmail(mailTo, code) {
        let nodemailer = require('nodemailer');
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hungb1577@gmail.com',
                pass: 'qvkn tvqw pstg ctii'
            }
        });
        let mailOptions = {
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
    }
}
exports.MailService = MailService;
exports.default = MailService;
//# sourceMappingURL=MailService.js.map
export class MailService{
    sendEmail(mailTo:string,code:string):void{
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

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                 console.log('Email sent: ' + info.response);
            }
       });
    }
}
export default MailService;
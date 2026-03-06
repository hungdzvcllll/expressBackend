import { Resend } from "resend";

const resend = new Resend("API_KEY");
export class MailService{
    async sendEmail(mailTo:string,code:string):Promise<void>{
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: mailTo,
            subject: "Register code",
            html: "<p>"+code+"</p>"
});
    }
}
export default MailService;
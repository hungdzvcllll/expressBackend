"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend("re_TmveEj1n_MzRsa2QFrks62VCmrxEvnuvi");
class MailService {
    async sendEmail(mailTo, code) {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: mailTo,
            subject: "Register code",
            html: "<p>" + code + "</p>"
        });
    }
}
exports.MailService = MailService;
exports.default = MailService;
//# sourceMappingURL=MailService.js.map
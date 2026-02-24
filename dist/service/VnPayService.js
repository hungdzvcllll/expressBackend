"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnPayService = void 0;
const DishOrderService_1 = require("./DishOrderService");
const vnpayconffig_1 = require("../vnpayConfig/vnpayconffig");
const date_fns_1 = require("date-fns");
const dishOrderService = new DishOrderService_1.DishOrderService();
class VnPayService {
    async getLink(req, res) {
        var ipAddr = req.ip;
        if (ipAddr)
            ipAddr = encodeURIComponent(ipAddr);
        var tmnCode = vnpayconffig_1.VnPayConfig.tmn_Code;
        var secretKey = vnpayconffig_1.VnPayConfig.hashSecret;
        var vnpUrl = vnpayconffig_1.VnPayConfig.paymentUrl;
        var returnUrl = vnpayconffig_1.VnPayConfig.returnUrl;
        var createDate = (0, date_fns_1.format)(new Date(), 'yyyyMMddHHmmss');
        var expired = (0, date_fns_1.format)(new Date((new Date()).getTime() + 15 * 60 * 1000), 'yyyyMMddHHmmss');
        var orderId = req.body.orderId;
        var amount = await dishOrderService.getTotalAmountForPay(orderId);
        var bankCode = req.body.bankCode;
        var locale = 'vn';
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_ExpiredDate'] = expired;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Infor';
        vnp_Params['vnp_OrderType'] = "type";
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        return vnpUrl;
    }
    async payResult(req, res) {
        var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
        var config = require('config');
        var tmnCode = vnpayconffig_1.VnPayConfig.tmn_Code;
        var secretKey = config.get('vnp_HashSecret');
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        if (secureHash === signed) {
            if (req.query.vnp_ResponseCode === "00" && req.query.TransactionStatus === "00")
                dishOrderService.setStatusSuccess(req.query.vnp_TxnRef);
            else
                throw new Error("some error happen");
        }
        else {
            throw new Error("cheat");
        }
    }
}
exports.VnPayService = VnPayService;
//# sourceMappingURL=VnPayService.js.map
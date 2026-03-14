"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnPayService = void 0;
var DishOrderService_1 = require("./DishOrderService");
var vnpayconffig_1 = require("vnpayConfig/vnpayconffig");
var date_fns_1 = require("date-fns");
var dishOrderService = new DishOrderService_1.DishOrderService();
var VnPayService = (function () {
    function VnPayService() {
    }
    VnPayService.prototype.getLink = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ipAddr, tmnCode, secretKey, vnpUrl, returnUrl, createDate, expired, orderId, amount, bankCode, locale, currCode, vnp_Params, querystring, signData, crypto, hmac, signed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ipAddr = req.ip;
                        if (ipAddr)
                            ipAddr = encodeURIComponent(ipAddr);
                        tmnCode = vnpayconffig_1.VnPayConfig.tmn_Code;
                        secretKey = vnpayconffig_1.VnPayConfig.hashSecret;
                        vnpUrl = vnpayconffig_1.VnPayConfig.paymentUrl;
                        returnUrl = vnpayconffig_1.VnPayConfig.returnUrl;
                        createDate = (0, date_fns_1.format)(new Date(), 'yyyyMMddHHmmss');
                        expired = (0, date_fns_1.format)(new Date((new Date()).getTime() + 15 * 60 * 1000), 'yyyyMMddHHmmss');
                        orderId = req.body.orderId;
                        return [4, dishOrderService.getTotalAmountForPay(orderId)];
                    case 1:
                        amount = _a.sent();
                        bankCode = req.body.bankCode;
                        locale = 'vn';
                        currCode = 'VND';
                        vnp_Params = {};
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
                        querystring = require('qs');
                        signData = querystring.stringify(vnp_Params, { encode: false });
                        crypto = require("crypto");
                        hmac = crypto.createHmac("sha512", secretKey);
                        signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
                        vnp_Params['vnp_SecureHash'] = signed;
                        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
                        return [2, vnpUrl];
                }
            });
        });
    };
    VnPayService.prototype.payResult = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var vnp_Params, secureHash, config, tmnCode, secretKey, querystring, signData, crypto, hmac, signed;
            return __generator(this, function (_a) {
                vnp_Params = req.query;
                secureHash = vnp_Params['vnp_SecureHash'];
                delete vnp_Params['vnp_SecureHash'];
                delete vnp_Params['vnp_SecureHashType'];
                config = require('config');
                tmnCode = vnpayconffig_1.VnPayConfig.tmn_Code;
                secretKey = config.get('vnp_HashSecret');
                querystring = require('qs');
                signData = querystring.stringify(vnp_Params, { encode: false });
                crypto = require("crypto");
                hmac = crypto.createHmac("sha512", secretKey);
                signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
                if (secureHash === signed) {
                    if (req.query.vnp_ResponseCode === "00" && req.query.TransactionStatus === "00")
                        dishOrderService.setStatusSuccess(req.query.vnp_TxnRef);
                    else
                        throw new Error("some error happen");
                }
                else {
                    throw new Error("cheat");
                }
                return [2];
            });
        });
    };
    return VnPayService;
}());
exports.VnPayService = VnPayService;
//# sourceMappingURL=VnPayService.js.map
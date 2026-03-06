"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnPayConfig = void 0;
var VnPayConfig = (function () {
    function VnPayConfig() {
    }
    VnPayConfig.tmn_Code = "D9M6WNSL";
    VnPayConfig.hashSecret = "8PVLJ4P1CY8O5QIVV7I63MVYCUMVME9T";
    VnPayConfig.paymentUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    VnPayConfig.returnUrl = "https://expressbackend-production-032e.up.railway.app/dishOrder/paymentResult";
    return VnPayConfig;
}());
exports.VnPayConfig = VnPayConfig;
//# sourceMappingURL=vnpayconffig.js.map
import {  DishOrderService } from './DishOrderService';
import { Request, Response } from "express"
import { VnPayConfig } from "vnpayConfig/vnpayconffig";
import { format } from 'date-fns';
const dishOrderService=new DishOrderService()
export class VnPayService{
    async getLink(req:Request,res:Response){
        var ipAddr=req.ip
        if(ipAddr)
            ipAddr=encodeURIComponent(ipAddr);
        //var dateFormat = require('dateformat');
    
        
        var tmnCode = VnPayConfig.tmn_Code;
        var secretKey = VnPayConfig.hashSecret;
        var vnpUrl = VnPayConfig.paymentUrl;
        var returnUrl =VnPayConfig.returnUrl
    
        
    
        var createDate = format(new Date(), 'yyyyMMddHHmmss');
        var expired=format(new Date((new Date()).getTime()+15*60*1000),'yyyyMMddHHmmss')
        var orderId = req.body.orderId
        var amount = await dishOrderService.getTotalAmountForPay(orderId);
        var bankCode = req.body.bankCode;
        
        var locale = 'vn'
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_ExpiredDate']=expired
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Infor';
        vnp_Params['vnp_OrderType'] = "type";
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }
    
        //vnp_Params = sortObject(vnp_Params);
    
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    
        return vnpUrl;
    }
    async payResult(req:Request,res:Response){
        var vnp_Params = req.query;
    
        var secureHash = vnp_Params['vnp_SecureHash'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
    
        var config = require('config');
        var tmnCode = VnPayConfig.tmn_Code;
        var secretKey = config.get('vnp_HashSecret');
    
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
    
        if(secureHash === signed){
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            if(req.query.vnp_ResponseCode==="00"&&req.query.TransactionStatus==="00")
                dishOrderService.setStatusSuccess(req.query.vnp_TxnRef)
            else
                throw new Error("some error happen")
        } else{
                throw new Error("cheat")
        }
    }


}
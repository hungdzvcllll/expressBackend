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
exports.UserService = void 0;
var bcrypt = require("bcrypt");
var User_1 = require("model/User");
var MailService_1 = require("./MailService");
var data_source_1 = require("data-source");
require('dotenv').config();
var JWT_SECRET = process.env.JWT_SECRET_KEY;
var jwt = require('jsonwebtoken');
var userRepository = data_source_1.AppDataSource.getRepository(User_1.default);
var mailService = new MailService_1.MailService();
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, email, phone, newPass, crypto, code, user, now, userSave;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, email = _a.email, phone = _a.phone;
                        return [4, bcrypt.hash(password, 10)];
                    case 1:
                        newPass = _b.sent();
                        crypto = require("crypto");
                        code = Math.floor(100000 + Math.random() * 900000).toString();
                        return [4, userRepository.findOne({ where: { name: username } })];
                    case 2:
                        user = _b.sent();
                        if (user != null)
                            throw new Error("change the username");
                        now = new Date();
                        mailService.sendEmail(email, code);
                        userSave = new User_1.default(username, newPass, phone, "USER", [], [], false, new Date(now.getTime() + 60 * 60 * 1000), email, code);
                        return [4, userRepository.save(userSave)];
                    case 3:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    UserService.prototype.confirmRegister = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, code, user, now;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, code = _a.code;
                        return [4, userRepository.findOne({ where: { name: username } })];
                    case 1:
                        user = _b.sent();
                        if (user == null)
                            throw new Error("user not exist");
                        if (user.registerCode != code)
                            throw new Error("code not true");
                        now = new Date();
                        if (now > user.registerExpired)
                            throw new Error("expired");
                        return [4, userRepository.update({ name: username }, { registerStatus: true })];
                    case 2:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    UserService.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, user, isMatch, payload, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        return [4, userRepository.findOne({ where: { name: username } })];
                    case 1:
                        user = _b.sent();
                        if (!user || user.registerStatus === false)
                            return [2, res.status(401).json({ message: 'Not found user' })];
                        return [4, bcrypt.compare(password, user.password)];
                    case 2:
                        isMatch = _b.sent();
                        if (!isMatch)
                            return [2, res.status(401).json({ message: 'Not true password' })];
                        payload = {
                            id: user.id,
                            username: user.name,
                            role: user.role,
                            phone: user.phone,
                            email: user.email
                        };
                        token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
                        return [2, { token: token, role: user.role }];
                }
            });
        });
    };
    UserService.prototype.yourProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var authHeader, token, decoded;
            return __generator(this, function (_a) {
                authHeader = req.headers.authorization;
                token = authHeader.split(' ')[1];
                decoded = jwt.verify(token, JWT_SECRET);
                return [2, decoded];
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
exports.default = UserService;
//# sourceMappingURL=UserService.js.map
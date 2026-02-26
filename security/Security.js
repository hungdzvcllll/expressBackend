"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var security = function (req, res, next, roles) {
    var token = req.headers.authorization;
    if (!token)
        return res.status(401).send("Access Denied / Unauthorized request");
    try {
        token = token.split(' ')[1];
        if (token === 'null' || !token)
            return res.status(401).send('Unauthorized request');
        var verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verifiedUser);
        if (!verifiedUser)
            return res.status(401).send('Unauthorized request');
        if (roles.includes(verifiedUser.role) === false)
            return res.status(403).send("you don't have permission");
        req.user = verifiedUser;
        next();
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};
exports.default = security;
//# sourceMappingURL=Security.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationAndAuthorizationMiddleware = void 0;
const jwt = require('jsonwebtoken');
class AuthenticationAndAuthorizationMiddleware {
    async authenticationAndAuthorization(req, res, next, roles) {
        let token = req.headers.authorization;
        if (!token)
            return res.status(401).send("Access Denied / Unauthorized request");
        try {
            token = token.split(' ')[1];
            if (token === 'null' || !token)
                return res.status(401).send('Unauthorized request');
            let verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (!verifiedUser)
                return res.status(401).send('Unauthorized request');
            if (roles.include(verifiedUser.role) === false)
                return res.status(403).send("you don't have permission");
            req.user = verifiedUser;
            next();
        }
        catch (error) {
            res.status(400).send("Invalid Token");
        }
    }
}
exports.AuthenticationAndAuthorizationMiddleware = AuthenticationAndAuthorizationMiddleware;
exports.default = AuthenticationAndAuthorizationMiddleware;
//# sourceMappingURL=AuthenticationAndAuthorizationMiddleware.js.map
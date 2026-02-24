const jwt = require('jsonwebtoken');

    const security=(req,res,next,roles)=>{
        let token = req.headers.authorization;
        if (!token) return res.status(401).send("Access Denied / Unauthorized request");

        try {
            token = token.split(' ')[1] ;// Remove Bearer from string

            if (token === 'null' || !token) return res.status(401).send('Unauthorized request');

            let verifiedUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log(verifiedUser) ;  // config.TOKEN_SECRET => 'secretKey'
            if (!verifiedUser) 
                return res.status(401).send('Unauthorized request')
            if(roles.includes(verifiedUser.role)===false)
                return res.status(403).send("you don't have permission")
            req.user = verifiedUser; // user_id & user_type_id
            next();

        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    

export default security;
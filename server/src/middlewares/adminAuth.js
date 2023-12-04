const userModel = require('../models/User');
//const logger = require('../config/logger');
//const User = models.user;

const adminAuth = async (req, res, next) => {
    try {
        
        //logger.error({"hhhhh":"xxxx"});
        const accessToken = req.headers['access-token'];
        console.log(accessToken)
        if(!accessToken){

            return res.status(401).json({"status":"error","message":"Invalid access token"});
        }
        const userData = await userModel.findOne({ token: accessToken });
        if (!userData) {
            return res.status(401).json({"status":"error","message":"Invalid access token"});
        } else {
            req.user = {};
            Object.assign(req.user, userData); 
            next();
        }
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({"status":"error","message":"Invalid access token"});
    }

    
};

module.exports = { adminAuth };
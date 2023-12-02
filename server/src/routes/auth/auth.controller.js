//const planets = require("../../models/planets.model")
const userModel = require('../../models/User');
const logger = require('../../config/logger');
const config = require('../../config/config');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const User = models.user;
const authController = {
    loginUser: async (req, res) => {
        try {
            
            const user = await new userModel({
                name:'sidhil',
                email:'s@s.com',
                phone:1234567890,
                address:"ssdd",
                password: "ddd",
                answer:'sss',
              }).save();
            
        } catch (err) {
            logger.error(err);
            console.log(err);
            return res.json({"status":"error"});
        }

    }
}

module.exports = authController;
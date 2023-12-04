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
            
            const {email, password} = req.body;
            if(!(email && password)){
                return res.status(422).json({status:'error',message:'invalid form fields'});
            }
            let user = await userModel.findOne({email});
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(404).json({status:'error', 'message':'login failed'});
            }

            const access_token = jwt.sign(
                { id: user.id, email },
                config.jwt.secret,
                {
                    //expiresIn: config.jwt.refreshExpirationDays,
                }
            );

            user.token = access_token;
            await user.save();

            let userData = {id:user.id,name:user.name,token:access_token};

           return res.status(201).json({status:'success',message:'Login success', data:userData});

            
        } catch (err) {
            logger.error(err);
            console.log(err);
            return res.json({"status":"error"});
        }

    },
    registerUser: async (req, res) => {
         const {name, email, password} = req.body;
         console.log(req.body)
         if(!(name && email && password)){
            return res.status(422).json({status:'error',message:'invalid form fields'});
         }

         let oldUser = await userModel.findOne({email});
         if(oldUser){
            return res.status(422).json({status:'error',message:'user exists'});
         }

         let encryptedPassword = await bcrypt.hash(password, 10);
            const formData = {
                name,
                email,
                password: encryptedPassword,
            };

            const user = await userModel.create(formData);

            const access_token = jwt.sign(
                { id: user.id, email },
                config.jwt.secret,
                {
                    //expiresIn: config.jwt.refreshExpirationDays,
                }
            );

            user.token = access_token;
            await user.save();
            return res.status(201).json({status:'success',message:'User created'});

    }
}

module.exports = authController;
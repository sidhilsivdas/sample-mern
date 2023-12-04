//const planets = require("../../models/planets.model")
const postModel = require('../../models/Post');

const logger = require('../../config/logger');
const config = require("../../config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const User = models.user;
const postsController = {
    getAllPosts: async (req, res) => {
        try {
            let page = +req.query.page || 0;
            let perPage = +req.query.perPage || 50;
            page = (page - 1) * perPage;

            const posts = await postModel.find({}).limit(50).skip(0).populate('user');

            return res.json({ "status": "success", "data": { items: posts } });
        } catch (err) {
            logger.error(err);
            console.log(err);
            return res.json({ "status": "error" });
        }

    },
    createPost: async (req, res) => {
        try {

            const { title, body } = req.body;
            if (!(title && body)) {
                return res.status(422).json({ "status": "error", "message": "Invalid form data" });
            }
            const postData = await postModel.findOne({ where: { title } });
            if (postData) {
                return res.status(422).json({ "status": "error", "message": "Post already exists" });
            }
            
            let post = await postModel.create({title, body, user:req.user});


            return res.json({ status: "success", "message": "Created", data: { id: post.id, title } });
        } catch (err) {
            logger.error(err);
            console.log(err);
            return res.status(500).json({ "status": "error" });
        }

    },

    updateUser: async (req, res) => {
        try {
            const { full_name, email, password, role } = req.body;
            if (!(full_name && email && role)) {
                return res.status(422).json({ "status": "error", "message": "Invalid form data" });
            }
            const userData = await User.findOne({ where: { id: req.params.id } });
            const UserDataByEmail = await User.findOne({ where: { email: email } });

            if (!userData) {
                return res.status(404).json({ "status": "error", "message": "User not found" });
            }
            if (UserDataByEmail && userData.id != UserDataByEmail.id) {
                return res.status(422).json({ "status": "error", "message": "Email already exist" });
            }

            const access_token = jwt.sign(
                { id: userData.id, email },
                config.jwt.secret,
                {
                    //expiresIn: config.jwt.refreshExpirationDays,
                }
            );

            let formData = {
                full_name,
                email,
                access_token,
                role

            };
            
            let encryptedPassword;
            if(password){
                encryptedPassword = await bcrypt.hash(password, 10);
                formData.password = encryptedPassword;
            }
            
            

            

            const result = await User.update(
                formData,
                { where: { id: req.params.id } }
            )

            return res.json({ status: "success", "message": "User Updated", data: { id: userData.id, full_name, email, role } });
        } catch (err) {
            logger.error(err);
            console.log(err);
            return res.status(500).json({ "status": "error" });
        }

    },

    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            const userData = await User.findOne({ where: { id } });
            if (!userData) {
                return res.status(404).json({ "status": "error", "message": "User not found" });
            }

            const result = await User.destroy({
                where: {
                    id
                }
            });

            return res.json({ status: "success", "message": "User Updated", data: {} });
        } catch (err) {
            logger.error(err);
            console.log(err);
            return res.status(500).json({ "status": "error" });
        }

    }
}

module.exports = postsController;
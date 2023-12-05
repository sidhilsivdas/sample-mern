//const planets = require("../../models/planets.model")
const invoiceModel = require('../../models/Invoice');
const invoiceItemModel = require('../../models/InvoiceItem');

const logger = require('../../config/logger');
const config = require("../../config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const User = models.user;
const invoiceController = {
    getAllPosts: async (req, res) => {

        console.log("here");
        // try {
        //     let page = +req.query.page || 0;
        //     let perPage = +req.query.perPage || 50;
        //     page = (page - 1) * perPage;

        //     const posts = await postModel.find({}).limit(50).skip(0).populate('user');

        //     return res.json({ "status": "success", "data": { items: posts } });
        // } catch (err) {
        //     logger.error(err);
        //     console.log(err);
        //     return res.json({ "status": "error" });
        // }

    },
    createInvoice: async (req, res) => {
        try {

            //console.log(req.body);

            const { date, InvoiceNumber } = req.body;
            if (!(date && InvoiceNumber)) {
                return res.status(422).json({ "status": "error", "message": "Invalid form data" });
            }
            
            
            let invoice = await invoiceModel.create({date, InvoiceNumber});

            req.body.InvoiceItems.foreach( async (item , idx) => {
                let invoiceItem = await invoiceItemModel.create({itemName:item.itemName, Quantity:item.Quantity,invoice})
            });
            //priyanshu.b@altiushub.com

            


           return res.json({ status: "success", "message": "Created", data: { id: invoice.id, InvoiceNumber } });
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

module.exports = invoiceController;
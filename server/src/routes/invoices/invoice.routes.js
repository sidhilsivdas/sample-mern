const express = require("express");
const invoiceController = require("./invoice.controller");
const invoiceRouter = express.Router();

invoiceRouter.get("/", invoiceController.getAllPosts);
invoiceRouter.post("/", invoiceController.createInvoice);
invoiceRouter.put("/:id", invoiceController.updateUser);
invoiceRouter.delete("/:id", invoiceController.deleteUser);


module.exports = invoiceRouter;
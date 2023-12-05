const mongoose = require("mongoose");
// const User = require('./User');

const invoiceItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
      //unique: true
    },
    Quantity: {
      type: String,
      required: true,
      
    },
    
    invoice: {type: mongoose.Types.ObjectId, ref: "Invoice"},
   
    
  },
  { timestamps: true }
);

module.exports =  mongoose.model("InvoiceItem", invoiceItemSchema);
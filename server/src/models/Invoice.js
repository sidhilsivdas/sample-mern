const mongoose = require("mongoose");
// const User = require('./User');

const invoiceSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
      //unique: true
    },
    InvoiceNumber: {
      type: String,
      required: true,
      
    }

    //user: {type: mongoose.Types.ObjectId, ref: "User"},
   
    
  },
  { timestamps: true }
);

module.exports =  mongoose.model("Invoice", invoiceSchema);
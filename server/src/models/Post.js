const mongoose = require("mongoose");
// const User = require('./User');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    body: {
      type: String,
      required: true,
      
    },
    user: {type: mongoose.Types.ObjectId, ref: "User"},
   
    
  },
  { timestamps: true }
);

module.exports =  mongoose.model("Post", postSchema);
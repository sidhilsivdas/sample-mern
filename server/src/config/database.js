const mongoose = require("mongoose");
const colors = require("colors");
const config = require('../config/config');
const connectDB = async () => {
    
  try {
    mongoose.set('debug', true);
    var options = {
   // logger: console.log,
   // loggerLevel: 'info',
   // poolSize: 10
}
    const conn = await mongoose.connect(process.env.MONGO_URL,options);
   
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
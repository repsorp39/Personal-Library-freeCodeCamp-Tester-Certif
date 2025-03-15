const mongoose = require("mongoose");


module.exports = async function dbConnect(){
    await mongoose.connect(process.env.DB_URI)
}
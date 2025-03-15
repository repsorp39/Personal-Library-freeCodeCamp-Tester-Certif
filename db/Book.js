const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    title:{ type:String},
    comments:{type:[String] ,default:[]},  
},
{
    versionKey:false
})

module.exports = mongoose.model("Book",BookSchema);
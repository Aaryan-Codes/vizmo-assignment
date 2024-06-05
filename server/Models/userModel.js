const mongoose = require('mongoose');

const userSchmea = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requied:true
    }
},{
    timestamps:true
})

const User = mongoose.model('users',userSchmea);
module.exports = User;
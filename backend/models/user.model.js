const mongoose = require('mongoose');

const userScahema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','artist'],
        defualt:'user'
    },
})

module.exports = mongoose.model('User',userScahema);


const mongoose = require('mongoose');
const { schema } = require('./user.model');

const musicSchema = new mongoose.Schema({
    uri:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
});

module.exports = mongoose.model('Music',musicSchema);
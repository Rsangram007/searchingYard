const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: " name is required",
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required:true,
        unique: true,
      
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    phone:{
       type:Number
    },
    profileImage:{
        type:String
    }
},
    { timestamps: true });

module.exports = mongoose.model('Userr', userSchema) 

import mongoose from "mongoose";

const Schema = mongoose.Schema
const userSchema = new Schema({
    role:{
        type:String,
        default:'user',
        enum:['user','admin'],
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
     bio: {
    type: String,
    trim: true,
  },
})

const User = mongoose.model('User',userSchema)

export default User
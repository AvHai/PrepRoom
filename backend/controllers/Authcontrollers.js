import { handleError } from "../helpers/handleError.js"
import User from "../models/userModel.js"
import bcryptjs from  'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register  = async (req, res, next)=>{
    try {
        const {name, email, password} = req.body
        const checkuser = await User.findOne({email})
        if(checkuser){
            //user already registered
            next(handleError(409, 'User Already Registered.'))
        }
        //register user
        const hashPassword = bcryptjs.hashSync(password)
        const user = new User({
            name, email, password:hashPassword
        })

        await user.save();
        
        res.status(200).json({
            success:true,
            message: 'Registration Successful'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const Login = async (req, res, next)=>{

   try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            next(handleError(404, 'Invalid Login Credentials.'))
        }
        const hashPassword = user.password

        const comparePassword = bcryptjs.compare(password,hashPassword)

        if(!comparePassword){
            next(handleError(404, 'Invalid Login Credentials.'))
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
        },process.env.JWT_SECRET)

        res.cookie('access_token', token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            path: '/'
        })
        const newUser = user.toObject({getters:true})
        delete newUser.password
        res.status(200).json({
            success:true,
            user: newUser,
            message: "Login Successful."
        })
   } 
   catch (error) {
    next(handleError(500, error.message))
   }
    
}

export const GoogleLogin = async (req, res, next)=>{

   try {
        const {name,email} = req.body
        let user
        user = await User.findOne({email})
        if(!user){
           //create new user
           const password = Math.random().toString()
           const hashPassword =bcryptjs.hashSync(password)
           const newUser = newUser({
            name , email , password:hashPassword
           })
           user = await newUser.save()
        }
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
        },process.env.JWT_SECRET)

        res.cookie('access_token', token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            path: '/'
        })
        const newUser = user.toObject({getters:true})
        delete newUser.password
        res.status(200).json({
            success:true,
            user: newUser,
            message: "Login Successful."
        })
   } 
   catch (error) {
    next(handleError(500, error.message))
   }
    
}
export const Logout = async (req, res, next)=>{

   try {
        res.clearCookie('access_token',{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            path: '/'
        })
        res.status(200).json({
            success:true,
            message: "Logout Successful."
        })
   } 
   catch (error) {
    next(handleError(500, error.message))
   }
    
}

import { handleError } from "../helpers/handleError.js"
import User from "../models/userModel.js"
import bcryptjs from "bcryptjs";


export const getUser = async (req,res,next) =>{
    try {
        const {userid} = req.params
        const user = await User.findOne({_id:userid}).lean().exec()
        if(!user){
            next(handleError(404, 'User not Found'))
        }
        res.status(200).json({
            success:true,
            message:'User data found.',
            user,
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
};

export const updateUser=async(req,res,next)=>{
  try {
    const data=JSON.parse(req.body.data)
    const {userid}=req.params

    const user=await User.findById(userid)
    user.name=data.name
    user.email=data.email
    user.bio=data.bio

    if(data.password && data.password.length>=8){
       const hashedPassword= bcryptjs.hashSync(data.password)
       user.password= hashedPassword
    }
    
    // if(req.file){
    //    const uploadResult = await cloudinary.uploader
    //    .upload(
    //        req.file.path,
    //        {folder: 'yt-mern-blog',resource_type:'auto'}
    //     )
    //    .catch((error) => {
    //        next(handleError(500,error.message))
    //    });

    //   user.avatar=uploadResult.secure_url
    // }
    await user.save()
      const newUser=user.toObject({getters:true})
      delete newUser.password
    res.status(200).json({
      success: true,
      message: 'data found.',
      user:newUser
    })
  } catch (error) {
    next(handleError(500, error.message)) 
}
}
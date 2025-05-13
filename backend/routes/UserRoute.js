import express from 'express'
import {getUser, updateUser} from '../controllers/Usercontrollers.js'
import multer from 'multer';
const UserRoute = express.Router()


const upload = multer();


UserRoute.get('/get-user/:userid', getUser)
UserRoute.put('/update-user/:userid', upload.none(),updateUser)


export default UserRoute
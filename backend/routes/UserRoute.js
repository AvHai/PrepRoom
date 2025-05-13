import express from 'express'
import {getUser} from '../controllers/Usercontrollers.js'

const UserRoute = express.Router()

UserRoute.get('/get-user/:userid', getUser)


export default UserRoute
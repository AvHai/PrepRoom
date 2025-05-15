import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import OpportunityRoute from './routes/OpportunityRoute.js'

dotenv.config({
    path : ".env"
})

const PORT = process.env.PORT || 4000
const app= express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true //cookie will come , if false then cookie will not reach backend
}))


//route setup

app.use('/api/auth', AuthRoute)
app.use('/api/user',UserRoute)
app.use('/api/opportunity', OpportunityRoute)


mongoose.connect(process.env.MONGODB_URL,{dbName:'PrepRoom'})
.then(()=> console.log('Database Connected'))
.catch(err=>console.log('Connection failed', err))



app.listen(PORT, ()=>{
    console.log(`Server runnning on Port ${PORT}`); 
});

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
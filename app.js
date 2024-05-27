require('dotenv').config()

const express = require("express")
global.dbconnection = require("./config/dbConfig")
global.dbutil = require("./utils/dbUtil")
global.bcrypt = require("bcrypt")
global.jwt = require("jsonwebtoken")
const cors = require("cors")
const app =express()
app.use(express.json())

app.use(cors())

app.listen(3000,()=>{
    console.log ("Server is running on port 3000")
})

app.get("/",(req,res)=>{
    res.send("From Ec2  Server!")
})


app.use(require("./routes/userRoutes"))

console.log("The version of Node.js running is:", process.version);

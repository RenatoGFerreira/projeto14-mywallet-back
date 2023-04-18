import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

const PORT = 5000
const app = express()

app.use(cors())
app.use(express.json())







app.listen(PORT, ()=>{
    console.log(`Server running in port ${PORT}.`)
})
import express from "express";
import cors from "cors"
import { MongoClient } from "mongodb";
import router from "./routes/app.js"

import dotenv from "dotenv"
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db;

const PORT = 5000

const server = express()

server.use(cors())
server.use(express.json())
server.use(router)


server.listen(PORT, () => console.log(`Server running in port ${PORT}`))



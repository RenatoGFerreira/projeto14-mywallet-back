import {MongoClient} from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)

try{
    await mongoClient.connect()
    console.log("MongoDB connected.")

}catch(err){
    console.log(err.message)
}

const db = mongoClient.db("myWalletData")

export const usersColletion = db.collection("users")
export const sessionsCollection = db.collection("sessions")

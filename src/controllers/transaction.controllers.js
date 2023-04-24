import { transactionsCollection } from "../database/db.js";

export async function createTransaction(req, res){
    const transaction = res.locals.transaction

    try{
        await transactionsCollection.insertOne(transaction)
        res.status(201).send("OK")
    }catch(err){
        res.status(500).send(err.message)
    }
}


export async function findTransaction(req, res){
    const user = res.locals.user
    
    console.log(user)

    try{
        const transactionsUser = await transactionsCollection.find({user: user._id}).toArray()
        delete user.password
        res.status(201).send({transactionsUser, user})

    }catch(err){
        res.status(500).send(err.message)
    }
}
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
    
}
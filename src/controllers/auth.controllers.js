import { usersColletion } from "../database/db.js";
import bcrypt from "bcrypt"

export async function cadastro(req, res){
    const user = res.locals.user
    console.log(user)

    if(user.password !== user.passwordConfirm){
        return res.status(409).send("A senha e a confirmação devem ser iguais")
    }

    const passwordHash = bcrypt.hashSync(user.password, 10)

    try{
        await usersColletion.insertOne({...user, password: passwordHash})
        res.sendStatus(201)

    }catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res){

}

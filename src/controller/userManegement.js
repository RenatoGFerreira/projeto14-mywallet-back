import { usersCollection, sessionsCollection } from '../config/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { ObjectID } from 'bson';


export async function postLogIn(req, res) {

    try {

        const { email, password } = req.body;

        const userExists = await usersCollection.findOne({ email })
        if (!userExists) {
            return res.status(404).send("Senha ou usuário não encontrado.")
        }
        if (userExists && bcrypt.compareSync(password, userExists.password)) {
            const token = uuid();

            await sessionsCollection.insertOne({
                userId: userExists._id,
                token
            })
            res.send({ token })
        } else {
            return res.status(401).send("Senha ou usuário não encontrado.");
        }

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postSignUp(req, res) {
    try {
        let { email, password, name } = req.body;

        const userExists = await usersCollection.findOne({ email })
        const nameUserExist = await usersCollection.findOne({ name })
        if (userExists || nameUserExist) {
            return res.status(409).send("Usuário já cadastrado");
        }
        
        const encryptedPassword = bcrypt.hashSync(password, 10);
        password = encryptedPassword 


        await usersCollection.insertOne({ email, password, name });
        
        res.sendStatus(201)

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postLogOut(req, res) {
    try {
        const { _id } = req.body
        const session = await sessionsCollection.findOne({ userId: ObjectID(_id) });
        if (!session) {
            return res.sendStatus(404);
        }
        await sessionsCollection.deleteOne({ userId: session.userId })
        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
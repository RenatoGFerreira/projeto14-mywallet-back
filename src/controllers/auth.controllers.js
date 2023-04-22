import { sessionsCollection, usersColletion } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function cadastro(req, res) {
  const user = res.locals.user;
  console.log(user);

  const passwordHash = bcrypt.hashSync(user.password, 10);

  try {
    await usersColletion.insertOne({ ...user, password: passwordHash });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const user = res.locals.user;
  const token = uuid();

  try {
    await sessionsCollection.insertOne({ token, userId: user._id });
    console.log(token)
    console.log(user._id)
    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

import { sessionsCollection, usersColletion } from "../database/db.js";
import { userSchema } from "../schemas/users.schema.js";
import bcrypt from "bcrypt";

export function userSchemaValidation(req, res, next) {
  const user = req.body;

  const validation = userSchema.validate(user, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  res.locals.user = user;

  next();
}

export async function signInValidation(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await usersColletion.findOne({ email });
    if (!user) {
      res.status(401).send("Email incorreto.");
    }

    const senhaOK = bcrypt.compareSync(password, user.password);
    if (!senhaOK) {
      res.status(401).send("Senha incorreto.");
    }

    res.locals.user = user;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function authRoutesValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send("No token, not authorized.");
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersColletion.findOne({ _id: session.userId });
    if (!user) {
      res.status(401).send("No user, not authorized");
    }

    res.locals.user = user;

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

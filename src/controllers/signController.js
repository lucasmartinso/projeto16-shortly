import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
import { v4 as uuidv4 } from "uuid";
dotenv.config(); 

export async function signup(req,res) { 
    const { name, email, password } = req.body; 
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await connection.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3)',[name,email,passwordHash]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export async function signin(req,res) { 
    const token = uuidv4();
    const user = res.locals.user; 

    try {
        await connection.query('INSERT INTO tokens ("userId",token) VALUES ($1,$2)',[user[0].id,token]);
        return res.send({ token }).status(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
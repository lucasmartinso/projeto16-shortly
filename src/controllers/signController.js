import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
import bcrypt from "bcrypt";
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
    const { email, password } = req.body;
    try {
        const { rows: findUser } = await connection.query('SELECT * FROM users WHERE email= $1',[email]);
        const passwordCompare = bcrypt.compareSync(password, findUser[0].password);
        if(findUser.length === 0 || passwordCompare===false) { 
            return res.sendStatus(401);
        }
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
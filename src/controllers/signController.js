import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
dotenv.config(); 

export async function signup(req,res) { 
    const { rows: users } = await connection.query('SELECT * FROM users');
    return res.send(users);
};

export async function signin(req,res) { 
    const { rows: users } = await connection.query('SELECT * FROM users');
    return res.send(users);
};
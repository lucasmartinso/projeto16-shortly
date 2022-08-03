import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
import { nanoid } from 'nanoid';
dotenv.config();  

export async function postUrl(req,res) { 
    const { url } = req.body;
    const { authorization } = req.headers;
    const tokenAuth = authorization?.replace("Bearer ", "");
    const shortUrl = nanoid(); 
    
    try {
        await connection.query('INSERT INTO urls ("shortUrl",url) VALUES ($1,$2)',[shortUrl,url]);
        return res.send({ shortUrl }).status(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
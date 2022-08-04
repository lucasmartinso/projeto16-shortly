import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
import { nanoid } from 'nanoid';
dotenv.config();  

export async function postUrl(req,res) { 
    const { url } = req.body;
    const shortUrl = nanoid(); 
    
    try {
        await connection.query('INSERT INTO urls ("shortUrl",url) VALUES ($1,$2)',[shortUrl,url]);
        return res.send({ shortUrl }).status(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}; 

export async function getUrlbyId(req,res) { 
    const { id } = req.params;
    try {
        const { rows: url } = await connection.query(`
            SELECT id,"shortUrl",url 
            FROM urls 
            WHERE id= $1`,[id]);
        if(url.length === 0) { 
            return res.sendStatus(404);
        }
        return res.send(url).status(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    } 
};

export async function getUrlbyShortUrl(req,res) { 
    const { shortUrl } = req.params;
    const userId = res.locals.userId;

    try { 
        const { rows: urlId } = await connection.query('SELECT id,url FROM urls WHERE "shortUrl"= $1',[shortUrl]);
        await connection.query('INSERT INTO visits ("urlId","userId") VALUES ($1,$2)',[urlId[0].id,userId[0].userId]);
        const { rows: visits } = await connection.query(`
            SELECT urls.id, urls."shortUrl",urls.url, COUNT(visits."urlId") AS visits
            FROM urls 
            JOIN visits ON urls.id = visits."urlId" 
            WHERE urls."shortUrl" = $1
            GROUP BY visits."urlId", urls.id
        `,[shortUrl]);
        console.log(visits);
        return res.redirect(200,urlId[0].url);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export async function deleteUrl(req,res) { 
    const { id } = req.params;
    const userId = res.locals.userId;

     try {
        const { rows: findUrl } = await connection.query('SELECT * FROM urls ')
     } catch (error) {
        console.log(error);
        return res.sendStatus(500);
     }
}
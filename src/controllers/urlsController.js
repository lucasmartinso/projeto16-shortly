import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
import { nanoid } from 'nanoid';
dotenv.config();  

export async function postUrl(req,res) { 
    const { url } = req.body;
    const userId = res.locals.userId;
    const shortUrl = nanoid(); 
    
    try {
        await connection.query('INSERT INTO urls ("shortUrl",url) VALUES ($1,$2)',[shortUrl,url]); 
        const { rows: urlInfo } = await connection.query('SELECT * FROM urls WHERE url= $1',[url]);
        console.log(userId);
        await connection.query('INSERT INTO "urlsUsers" ("urlId","userId") VALUES ($1,$2)',[urlInfo[0].id,userId[0].userId]);
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

    try { 
        const { rows: urlId } = await connection.query('SELECT id,url FROM urls WHERE "shortUrl"= $1',[shortUrl]);
        const { rows: userId } = await connection.query(`
            SELECT uu."userId",u.url 
            FROM "urlsUsers" uu 
            JOIN urls u ON u.id = uu."urlId"
            WHERE u.url = $1
            `,[urlId[0].url]);
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
        const { rows: findUrl } = await connection.query('SELECT * FROM urls WHERE id= $1',[id]);
        if(findUrl.length === 0) { 
            return res.sendStatus(404);
        }
        const { rows: belongUser } = await connection.query(`
            SELECT urls.id,users.name, urls.url, urls."shortUrl" 
            FROM urls 
            JOIN "urlsUsers" uu ON urls.id = uu."urlId"
            JOIN users ON users.id = uu."userId"
            WHERE uu."userId" = $1 AND uu."urlId"= $2
            `,[userId[0].userId,id]);
        if(belongUser.length===0) { 
            return res.sendStatus(401);
        }    
        await connection.query('DELETE FROM "urlsUsers" WHERE "urlId"= $1',[id]);
        await connection.query('DELETE FROM urls WHERE url= $1',[belongUser[0].url]);
        return res.sendStatus(204);
     } catch (error) {
        console.log(error);
        return res.sendStatus(500);
     }
};
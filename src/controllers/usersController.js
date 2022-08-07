import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
dotenv.config();  

export async function getHistoric(req,res) { 
    const userId = res.locals.userId;
    
    try {
        const { rows: verifyUser } = await connection.query(`SELECT * FROM users WHERE id= $1`,[userId[0].userId]); 
        if(verifyUser.length === 0) { 
            return res.sendStatus(404);
        }
        const { rows: historic } = await connection.query(`SELECT json_build_object(
            'id', users.id,
            'name', users.name,
            'visitCount', SUM(v."countVisits"), 
            'shortenedUrls', json_agg(json_build_object(
                'id', urls.id,
                'shortUrl', urls."shortUrl",
                'url', urls.url, 
                'visitCount', v."countVisits"
            )))
            FROM users  
            JOIN "urlsUsers" uu ON users.id= uu."userId"
            JOIN urls ON uu."urlId" = urls.id
            JOIN visits v ON v."urlId" = urls.id
            WHERE users.id= $1
            GROUP BY users.id
            `,[userId[0].userId]);
        return res.send(historic.map(hist => hist.json_build_object)).status(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export async function getRanking(req,res) { 
    try {
        const { rows: ranking } = await connection.query(`
            SELECT users.id, users.name, COUNT(uu."urlId") AS "linksCount", SUM(v."countVisits") AS "visitCount"
            FROM users
            JOIN  "urlsUsers" uu ON uu."userId" = users.id
            JOIN urls ON urls.id = uu."urlId"
            JOIN visits v ON urls.id = v."urlId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            OFFSET 0 LIMIT 10
            `);
        return res.send(ranking);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
dotenv.config();  

export async function getHistoric(req,res) { 
    const userId = res.locals.userId;
    
    try {
        const { rows: historic } = await connection.query(`SELECT json_build_object(
            'id', users.id,
            'name', users.name, 
            'shortenedUrls' , (SELECT id,"shortUrl", url, json_agg(row_to_json("urls")) FROM "urls")
            )
            FROM users 
            JOIN tokens t ON t."userId" = users.id
            JOIN "urlsUsers" uu ON users.id = uu."userId"
            JOIN urls ON uu."urlId" = urls.id
            JOIN visits v ON v."urlId" = urls.id
            WHERE t."userId" = $1
            GROUP BY "urls.id", users.id
            `,[userId[0].userId]);
        return res.send(historic.map(hist => hist.json_build_object)).status(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export async function getRanking(req,res) { 

};

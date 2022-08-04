import connection from '../dbStrategy/postgresdb.js'; 

export async function validateAuth(req,res,next) { 
    const { authorization } = req.headers;
    const tokenAuth = authorization?.replace("Bearer ", ""); 

    try {
        const { rows: permission } = await connection.query('SELECT * FROM tokens WHERE token= $1',[tokenAuth]);
        if(permission.length === 0) { 
            return res.sendStatus(401);
        }
        res.locals.userId = permission;
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    } 
    next();
};
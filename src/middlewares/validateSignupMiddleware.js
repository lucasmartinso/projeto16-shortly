import connection from "../dbStrategy/postgresdb.js";
import signupSchema from "../schemas/signupSchema.js";

export async function validateSignup(req,res,next) { 
    const { email, password, repeatPassword } = req.body;
    const validation = signupSchema.validate(req.body);
    
    if(validation.error || password !== repeatPassword) { 
        return res.sendStatus(422);
    } 

    try {
        const { rows: findRepeteadEmail } = await connection.query('SELECT * FROM users WHERE email= $1',[email]);
        if(findRepeteadEmail.length !== 0) { 
            return res.sendStatus(409);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    next();
}
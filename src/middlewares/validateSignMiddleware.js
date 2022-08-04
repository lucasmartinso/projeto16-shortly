import connection from "../dbStrategy/postgresdb.js";
import signupSchema from "../schemas/signupSchema.js";
import signinSchema from "../schemas/signinSchema.js";
import bcrypt from "bcrypt";

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
}; 

export async function validateSignin(req,res,next) { 
    const { email, password } = req.body;
    const validation = signinSchema.validate(req.body);
    
    if(validation.error) { 
        return res.sendStatus(422);
    } 

    try {
        const { rows: findUser } = await connection.query('SELECT * FROM users WHERE email= $1',[email]);
        const passwordCompare = bcrypt.compareSync(password, findUser[0].password);
        if(findUser.length === 0 || passwordCompare===false) { 
            return res.sendStatus(401);
        }
        res.locals.user = findUser;
    } catch (error) {
        console.log(error); 
        return res.sendStatus(500);
    }
    next();
}
import urlSchema from "../schemas/urlSchema.js";

export default function validateUrl(req,res,next) { 
    const validation = urlSchema.validate(req.body);
    
    if(validation.error) { 
        return res.sendStatus(422);
    } 
    next();
}
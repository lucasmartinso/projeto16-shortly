import { Router } from "express";
import dotenv from "dotenv"; 
import { signup , signin } from "../controllers/signController.js"
import { validateSignup, validateSignin } from "../middlewares/validateSignMiddleware.js";
dotenv.config(); 

const router = Router();

router.post("/signup", validateSignup,signup);  
router.post("/signin", validateSignin,signin);

export default router;

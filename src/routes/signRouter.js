import { Router } from "express";
import dotenv from "dotenv"; 
import { signup , signin } from "../controllers/signController.js"
import { validateSignup } from "../middlewares/validateSignupMiddleware.js";
dotenv.config(); 

const router = Router();

router.post("/signup", validateSignup,signup);  
router.post("/signin", signin);

export default router;

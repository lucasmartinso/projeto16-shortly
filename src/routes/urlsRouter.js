import { Router } from "express";
import dotenv from "dotenv"; 
import { postUrl }  from "../controllers/urlsController.js"
import validateUrl from "../middlewares/validateUrlMiddleware.js"
dotenv.config(); 

const router = Router();

router.post("/urls/shorten", validateUrl,postUrl);
router.get("/urls/:id",); 
router.get("/urls/open/:shortUrl",);  
router.delete("/urls/:id",);

export default router;

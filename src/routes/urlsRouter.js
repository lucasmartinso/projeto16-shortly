import { Router } from "express";
import dotenv from "dotenv"; 
import { postUrl, getUrlbyId, getUrlbyShortUrl, deleteUrl }  from "../controllers/urlsController.js"
import validateUrl from "../middlewares/validateUrlMiddleware.js";
import { validateAuth } from "../middlewares/validateAuthMiddleware.js";
dotenv.config(); 

const router = Router();

router.post("/urls/shorten", validateAuth,validateUrl,postUrl);
router.get("/urls/:id", getUrlbyId); 
router.get("/urls/open/:shortUrl",getUrlbyShortUrl);  
router.delete("/urls/:id",validateAuth,deleteUrl);

export default router;

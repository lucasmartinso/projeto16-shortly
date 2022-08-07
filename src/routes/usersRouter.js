import { Router } from "express";
import dotenv from "dotenv"; 
import { getHistoric, getRanking } from "../controllers/usersController.js"
import { validateAuth } from "../middlewares/validateAuthMiddleware.js";
dotenv.config(); 

const router = Router();

router.get("/users/me", validateAuth, getHistoric);
router.get("/ranking",getRanking);

export default router;

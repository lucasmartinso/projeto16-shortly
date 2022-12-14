import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import signRouter from "./routes/signRouter.js";
import urlsRouter from "./routes/urlsRouter.js";
import usersRouter from "./routes/usersRouter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

app.use(signRouter,urlsRouter,usersRouter);

app.listen(process.env.PORT, () => { 
    console.log(chalk.blue.bold(`\nRodando na porta ${process.env.PORT}`));
})
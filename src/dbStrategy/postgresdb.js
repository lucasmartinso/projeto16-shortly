import pg from 'pg';
import dotenv from "dotenv"; 
dotenv.config(); 

const { Pool } = pg; 

console.log(process.env.DATABASE_URL);

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
  }
  }; 

  const connection = new Pool(databaseConfig);

  export default connection;
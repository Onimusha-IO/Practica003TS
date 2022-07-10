import dotenv from "dotenv";
dotenv.config();

const config = {
  apiPort: process.env.API_PORT || 3001,
  apiKey: process.env.API_KEY,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PWD,
  dbName: process.env.DB_NAME,
  dbPort: parseInt(process.env.DB_PORT || "5432"),
  secret: process.env.SECRET as string,
};

export default config;

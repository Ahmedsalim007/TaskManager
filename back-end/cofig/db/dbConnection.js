import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import dns from 'dns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connection_URL = process.env.MONGO_URL;

export const db_connection = async () => {
  await mongoose.connect(connection_URL);
  console.log("DataBase is Connected Successfully");
};
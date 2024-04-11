import express, { Request, Response } from 'express';
import http from 'http';
import Database from './config/dbconnection';
import dotenv from 'dotenv';
import authRoutes from "./Apis/Routes/Auth/AuthRoutes"

dotenv.config();

const app = express();
app.use('/auth', authRoutes);

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

async function initialize() {
    const database = Database.getInstance();
    await database.connect(uri!, dbName!);
}

initialize();

// Express server
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

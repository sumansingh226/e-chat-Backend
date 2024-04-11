import express, { Request, Response } from 'express';
import http from 'http';
import Database from './config/dbconnection';

const app = express();

const uri = 'mongodb://localhost:27017';
const dbName = 'e-chat';

async function initialize() {
    const database = Database.getInstance();
    await database.connect(uri, dbName);
}

initialize();

// Express server
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

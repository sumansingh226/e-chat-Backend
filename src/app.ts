import express, { Request, Response } from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import Database from './config/dbconnection';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);



// Root resolver
const root = {
    hello: () => 'Hello, world!'
};


// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


const uri = 'mongodb://localhost:27017';
const dbName = 'e-chat';

async function initialize() {
    const database = Database.getInstance();
    await database.connect(uri, dbName);

    const db = database.getDb();
}

initialize();
// Express server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

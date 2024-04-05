import { MongoClient, Db } from 'mongodb';

let db: Db;

export async function connectDatabase(uri: string, dbName: string): Promise<void> {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        db = client.db(dbName);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

export function getDb(): Db {
    if (!db) {
        throw new Error('Database not connected');
    }

    return db;
}

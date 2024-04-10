import { MongoClient, Db } from 'mongodb';

class Database {
    private static instance: Database;
    private db: Db | null = null;

    private constructor() { }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async connect(uri: string, dbName: string): Promise<void> {
        if (this.db) {
            return;
        }

        const client = new MongoClient(uri);

        try {
            await client.connect();
            console.log('Connected to MongoDB');

            this.db = client.db(dbName);
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            process.exit(1);
        }
    }

    getDb(): Db {
        if (!this.db) {
            throw new Error('Database not connected');
        }

        return this.db;
    }
}

export default Database;

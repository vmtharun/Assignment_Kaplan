import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mockDb = new MongoMemoryServer();

export const connect = async () => {
    const uri = await mockDb.getConnectionString();

    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true
    }

    await mongoose.connect(uri, mongooseOpts);
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
    if (mongoose && mongoose.connection) {
        mongoose.connection.on('open', async function(){
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
        });
    }
    await mockDb.stop();
}

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}
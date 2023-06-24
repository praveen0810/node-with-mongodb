import { MongoClient } from 'mongodb';

let db = null;
const dbName = process.env.MONGO_DB
const client = new MongoClient(`mongodb://127.0.0.1:27017/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const connectDB = async () => {
    try {
        await client.connect();
        console.log("Database is connected")
    } catch (error) {
        console.log(`Database Error======>: ${error} `)
        process.exit(1)
    }
}
async function getDB() {
    return client.db(dbName)
}

export {
    connectDB,
    getDB,
}
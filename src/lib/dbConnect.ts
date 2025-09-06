import mongoose from "mongoose";

type ConnectionObject = {
    isConnected ?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || "", {});
        connection.isConnected = db.connections[0].readyState;

    } catch (error) {
        process.exit();
    }
}

export default dbConnect;
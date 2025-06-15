import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to the database")
        return
    }

    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }
        const db = await mongoose.connect(uri);
        // console.log(db)

        connection.isConnected = db.connections[0].readyState
        console.log("Db connected succesfully")

    } catch (error) {
        
        console.log("DB connection unsucessful!!!!", error)

        process.exit(1)
    }
}

export default dbConnect
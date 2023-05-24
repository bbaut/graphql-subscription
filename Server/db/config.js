import mongoose from "mongoose";

const dbConnection = () => {
    const MONGO_HOST = "localhost"
    const MONGO_DB = "db_presentation"

    const URI = `mongodb://${MONGO_HOST}/${MONGO_DB}`;
    
    try {
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("🌿 Database connected")
    }
    catch (error) {
        console.log(error);
        throw new Error('Error with the db')
    }
}

export default dbConnection;
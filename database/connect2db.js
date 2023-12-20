import mongoose from 'mongoose'
import 'dotenv/config'

export default async (req, res, next) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING)
        .then(() => {
            console.log("Connected successfully to MongoDB");
        })
        .catch(() => {
            console.log("Couldn't connect to MongoDB");
        })
}
import express from 'express'
import bodyParser from 'body-parser'//?body-parser is used in Node.js to parse the body of incoming HTTP requests, making it easier to access and process the data within your application.
import dotenv from 'dotenv' //?This is used for import env file
import helmet from 'helmet'//?helmet is a Node.js middleware that sets security-related HTTP headers to protect your web application from common vulnerabilities and attacks.
import { connectDB } from '../src/config/db.js'

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet())
dotenv.config();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
    }
    next()
})
connectDB()

const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is Running on 8080")
})
export default app;
import express from 'express'
import bodyParser from 'body-parser'
import env from 'dotenv'
import helmet from 'helmet'

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet())


const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is Running on 8080")
})
export default app;
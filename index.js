import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/', (req, res)=>{

    res.send("Welocme to the ChatterUp Web Application")
})

export default app;
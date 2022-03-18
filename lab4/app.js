import dotenv from 'dotenv'
dotenv.config()

import express, { urlencoded } from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import DBconnection from './lib/mysql-connection.js'
import AuthenticateJWT from './middleware/AuthenticateJWT.js'
import AdminAuthenticate from './middleware/AdminAuthenticate.js'
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import postRoutes from './routes/postRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/categories', AuthenticateJWT, categoryRoutes(DBconnection))
app.use('/posts', AuthenticateJWT, postRoutes(DBconnection))
app.use('/users', userRoutes(DBconnection))
app.use('/admin', AdminAuthenticate, adminRoutes(DBconnection))

export default app

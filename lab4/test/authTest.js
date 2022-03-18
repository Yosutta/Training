import app from '../app.js'
import redisClient from '../lib/redis-connection.js'
import DBconnection from '../lib/mysql-connection.js'
import UserModel from '../models/userModel.js'
import { ROUTE_AUTH } from './RouteAlias.js'
import crypto from 'crypto'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import jsonwebtoken from 'jsonwebtoken'

const RANDOM_ID = crypto.randomBytes(10).toString('hex')
const body = { email: `tinphu${RANDOM_ID}@gmail.com`, password: '123' }
const jwtSecret = process.env.JWT_SECRET || 'Thisisabadsecret'

describe('Authentication testing', () => {
  let token = ''
  test('Registration', async () => {
    const response = await request(app).post(ROUTE_AUTH.REGISTER).send(body)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.messagecode).toBe('Successfully created a new account')
  })

  test('Registered account in SQL', async () => {
    const data = await UserModel.getUserByEmailAndPassword(
      DBconnection,
      body.email,
      body.password
    )
    expect(data).toBeDefined()
  })

  test('Login', async () => {
    const response = await request(app).post(ROUTE_AUTH.LOGIN).send(body)
    token = response.body.data.token
    expect(response.statusCode).toEqual(StatusCodes.OK)
  })

  test('JWT token in Redis after login', async () => {
    const currentUserId = jsonwebtoken.verify(token, jwtSecret)
    const redisToken = await redisClient.get(currentUserId.user_id)
    expect(redisToken).toBeTruthy()
  })

  test('Logout', async () => {
    const response = await request(app)
      .post(ROUTE_AUTH.LOGOUT)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(StatusCodes.OK)
  })

  test('JWT token in Redis after logout', async () => {
    const currentUser = jsonwebtoken.verify(token, jwtSecret)
    const redisToken = await redisClient.get(currentUser.user_id)
    expect(redisToken).toBeFalsy()
  })

  test('Get all users data', async () => {
    const response = await request(app).get(ROUTE_AUTH.ALL_USERS)
    const data = await UserModel.getAllUsers(DBconnection)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.data.all_users_data).toStrictEqual(data)
  })

  test('Get a single user data', async () => {
    const currentUser = jsonwebtoken.verify(token, jwtSecret)
    const response = await request(app).get(
      `${ROUTE_AUTH.SINGLE_USER}${currentUser.user_id}`
    )
    const data = await UserModel.getSingleUserById(
      DBconnection,
      currentUser.user_id
    )
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.data.user_data).toStrictEqual(data)
  })
})

export default describe

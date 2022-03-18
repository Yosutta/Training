import app from '../app.js'
import DBconnection from '../lib/mysql-connection.js'
import PostModel from '../models/postModel.js'
import { ROUTE_AUTH, ROUTE_POSTS } from './RouteAlias.js'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import jsonwebtoken from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET || 'Thisisabadsecret'

describe('Post route testing', () => {
  let token = ''
  let currentUserId = ''
  let newPostId = ''

  test('Login for authorization', async () => {
    const response = await request(app).post(ROUTE_AUTH.LOGIN).send({
      email: 'wachao@gmail.com',
      password: '123',
    })
    token = response.body.data.token
    const tokenPayload = jsonwebtoken.verify(token, jwtSecret)
    currentUserId = tokenPayload.userId
    expect(response.statusCode).toEqual(StatusCodes.OK)
  })

  test('GET all posts data', async () => {
    const data = await PostModel.getAllPosts(DBconnection)
    const response = await request(app)
      .get(ROUTE_POSTS.ALL)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.data.allPostsData).toStrictEqual(data)
  })

  test('GET a single post data', async () => {
    const postId = 1
    const data = await PostModel.getSinglePost(DBconnection, postId)
    const response = await request(app)
      .get(`${ROUTE_POSTS.SINGLE}${postId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.data.postData).toStrictEqual(data)
  })

  test('Create a new post', async () => {
    const postTitle = 'Politics'
    const postSlug = 'politic'
    const postPublished = 1
    const postCreatedAt = new Date(Date.now()).toISOString().split('T')[0]
    const postContent = 'World"s politcs perspective'
    const result = await PostModel.addNewPost(
      DBconnection,
      currentUserId,
      postTitle,
      postSlug,
      postPublished,
      postCreatedAt,
      postContent
    )
    newPostId = result.insertId
    const data = await PostModel.getSinglePost(DBconnection, newPostId)
    expect(data.authorId).toStrictEqual(currentUserId)
    expect(data.title).toStrictEqual(postTitle)
    expect(data.slug).toStrictEqual(postSlug)
    expect(data.content).toStrictEqual(postContent)
  })

  test('Update a post', async () => {
    const postTitle = 'Technologies'
    const postSlug = 'tech'
    const postContent = 'Latest news about technologies'
    await PostModel.editSinglePost(
      DBconnection,
      newPostId,
      postTitle,
      postSlug,
      postContent
    )
    const data = await PostModel.getSinglePost(DBconnection, newPostId)
    expect(data.id).toStrictEqual(newPostId)
    expect(data.title).toStrictEqual(postTitle)
    expect(data.slug).toStrictEqual(postSlug)
    expect(data.content).toStrictEqual(postContent)
  })

  test('Delete a post', async () => {
    await PostModel.deleteSinglePost(DBconnection, newPostId)
    const data = await PostModel.getSinglePost(DBconnection, newPostId)
    expect(data).toBeFalsy()
  })
})

export default describe

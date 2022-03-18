import app from '../app.js'
import DBconnection from '../lib/mysql-connection.js'
import PostModel from '../models/postModel.js'
import CheckPermission from '../middleware/checkPermisison.js'
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
    currentUserId = tokenPayload.user_id
    expect(response.statusCode).toEqual(StatusCodes.OK)
  })

  test('GET all posts data', async () => {
    const data = await PostModel.getAllPosts(DBconnection)
    const response = await request(app)
      .get(ROUTE_POSTS.ALL)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.data.all_posts_data).toStrictEqual(data)
  })

  test('GET a single post data', async () => {
    const postId = 1
    const data = await PostModel.getSinglePost(DBconnection, postId)
    const response = await request(app)
      .get(`${ROUTE_POSTS.SINGLE}${postId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.data.post_data).toStrictEqual(data)
  })

  test('Create a new post', async () => {
    const post_title = 'Politics'
    const post_slug = 'politic'
    const post_published = 1
    const post_created_at = new Date(Date.now()).toISOString().split('T')[0]
    const post_content = 'World"s politcs perspective'
    const result = await PostModel.addNewPost(
      DBconnection,
      currentUserId,
      post_title,
      post_slug,
      post_published,
      post_created_at,
      post_content
    )
    newPostId = result.insertId
    const data = await PostModel.getSinglePost(DBconnection, newPostId)
    expect(data.authorId).toStrictEqual(currentUserId)
    expect(data.title).toStrictEqual(post_title)
    expect(data.slug).toStrictEqual(post_slug)
    expect(data.content).toStrictEqual(post_content)
  })

  test('Update a post', async () => {
    const new_post_title = 'Technologies'
    const new_post_slug = 'tech'
    const new_post_content = 'Latest news about technologies'
    await PostModel.editSinglePost(
      DBconnection,
      newPostId,
      new_post_title,
      new_post_slug,
      new_post_content
    )
    const data = await PostModel.getSinglePost(DBconnection, newPostId)
    expect(data.id).toStrictEqual(newPostId)
    expect(data.title).toStrictEqual(new_post_title)
    expect(data.slug).toStrictEqual(new_post_slug)
    expect(data.content).toStrictEqual(new_post_content)
  })

  test('Delete a post', async () => {
    await PostModel.deleteSinglePost(DBconnection, newPostId)
    const data = await PostModel.getSinglePost(DBconnection, newPostId)
    expect(data).toBeFalsy()
  })
})

export default describe

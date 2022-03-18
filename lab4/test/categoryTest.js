import app from '../app.js'
import DBconnection from '../lib/mysql-connection.js'
import CategoryModel from '../models/categoryModel.js'
import CheckPermission from '../middleware/checkPermisison.js'
import { ROUTE_AUTH, ROUTE_CATEGORIES } from './RouteAlias.js'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import jsonwebtoken from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET || 'Thisisabadsecret'

describe('Category route testing', () => {
  let token = ''
  let currentUserId = ''
  let newCategoryId = ''

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

  test('GET all categories data', async () => {
    const data = await CategoryModel.getAllCategories(DBconnection)
    const response = await request(app)
      .get(ROUTE_CATEGORIES.ALL)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.data.all_categories_data).toStrictEqual(data)
  })

  test('GET a single category data', async () => {
    const categoryId = 1
    const data = await CategoryModel.getSingleCategory(DBconnection, categoryId)
    const response = await request(app)
      .get(`${ROUTE_CATEGORIES.SINGLE}${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.data.category_data).toStrictEqual(data)
  })

  test('Create a new category', async () => {
    const category_title = 'Politics'
    const category_slug = 'politic'
    const category_content = 'World"s politcs perspective'
    const result = await CategoryModel.addNewCategory(
      DBconnection,
      currentUserId,
      category_title,
      category_slug,
      category_content
    )
    newCategoryId = result.insertId
    const data = await CategoryModel.getSingleCategory(
      DBconnection,
      newCategoryId
    )
    expect(data.authorId).toStrictEqual(currentUserId)
    expect(data.title).toStrictEqual(category_title)
    expect(data.slug).toStrictEqual(category_slug)
    expect(data.content).toStrictEqual(category_content)
  })

  test('Update a category', async () => {
    const category_title = 'Technologies'
    const category_slug = 'tech'
    const category_content = 'Latest news about technologies'
    await CategoryModel.editSingleCategory(
      DBconnection,
      newCategoryId,
      category_title,
      category_slug,
      category_content
    )
    const data = await CategoryModel.getSingleCategory(
      DBconnection,
      newCategoryId
    )
    expect(data.id).toStrictEqual(newCategoryId)
    expect(data.title).toStrictEqual(category_title)
    expect(data.slug).toStrictEqual(category_slug)
    expect(data.content).toStrictEqual(category_content)
  })

  test('Delete a category', async () => {
    await CategoryModel.deleteSingleCategory(DBconnection, newCategoryId)
    const data = await CategoryModel.getSingleCategory(
      DBconnection,
      newCategoryId
    )
    expect(data).toBeFalsy()
  })
})

export default describe

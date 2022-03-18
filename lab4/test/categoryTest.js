import app from '../app.js'
import DBconnection from '../lib/mysql-connection.js'
import CategoryModel from '../models/categoryModel.js'
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
    currentUserId = tokenPayload.userId
    expect(response.statusCode).toEqual(StatusCodes.OK)
  })

  test('GET all categories data', async () => {
    const data = await CategoryModel.getAllCategories(DBconnection)
    const response = await request(app)
      .get(ROUTE_CATEGORIES.ALL)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.data.allCategoriesData).toStrictEqual(data)
  })

  test('GET a single category data', async () => {
    const categoryId = 1
    const data = await CategoryModel.getSingleCategory(DBconnection, categoryId)
    const response = await request(app)
      .get(`${ROUTE_CATEGORIES.SINGLE}${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.data.categoryData).toStrictEqual(data)
  })

  test('Create a new category', async () => {
    const categoryTitle = 'Politics'
    const categorySlug = 'politic'
    const categoryContent = 'World"s politcs perspective'
    const result = await CategoryModel.addNewCategory(
      DBconnection,
      currentUserId,
      categoryTitle,
      categorySlug,
      categoryContent
    )
    newCategoryId = result.insertId
    const data = await CategoryModel.getSingleCategory(
      DBconnection,
      newCategoryId
    )
    expect(data.authorId).toStrictEqual(currentUserId)
    expect(data.title).toStrictEqual(categoryTitle)
    expect(data.slug).toStrictEqual(categorySlug)
    expect(data.content).toStrictEqual(categoryContent)
  })

  test('Update a category', async () => {
    const categoryTitle = 'Technologies'
    const categorySlug = 'tech'
    const categoryContent = 'Latest news about technologies'
    await CategoryModel.editSingleCategory(
      DBconnection,
      newCategoryId,
      categoryTitle,
      categorySlug,
      categoryContent
    )
    const data = await CategoryModel.getSingleCategory(
      DBconnection,
      newCategoryId
    )
    expect(data.id).toStrictEqual(newCategoryId)
    expect(data.title).toStrictEqual(categoryTitle)
    expect(data.slug).toStrictEqual(categorySlug)
    expect(data.content).toStrictEqual(categoryContent)
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

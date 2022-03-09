const express = require('express')
const app = express()
const redisClient = require('./redis/connection.redis')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = await redisClient.json.get(id)
    res.status(StatusCodes.OK).json(data)
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
})

app.post('/:id/update-category-write-permission', async (req, res) => {
  const { id } = req.params
  try {
    // const foundUser = await redisClient.json.get(id, {
    //   path: '.permission.category.write',
    // })
    // console.log(foundUser)
    await redisClient.json.set(id, '$.permission.category.write', true)
    res.status(StatusCodes.OK).send(ReasonPhrases.OK)
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
})

app.post('/:id/:name', async (req, res) => {
  const username = req.params.name
  const permission = {
    blog: {
      read: true,
      write: true,
    },
    category: {
      read: true,
      write: false,
    },
  }
  const is_valid = true
  const created_at = new Date(Date.now()).toISOString()
  const updated_at = new Date(Date.now()).toISOString()

  const token = { username, permission, is_valid, created_at, updated_at }

  try {
    await redisClient.json.set(req.params.id, '$', token)
    res.status(StatusCodes.OK).send(ReasonPhrases.OK)
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})

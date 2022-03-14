const QUEUE_NAME = 'square'
const EXCHANGE_NAME = 'main'
const EXCHANGE_TYPE = 'fanout'
const ROUTING_KEY = 'category'
const connection = require('../lib/rabbitmq.connection')
const fs = require('fs')

// const numbers = ['1', '2', '3', '4', '5', '6', '7']
const number = 1
// const json = JSON.stringify({ name: 'tin' })
const json = fs.readFileSync('./sample-json.json')

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)
  await channel.assertQueue(QUEUE_NAME)
  channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY)
  // numbers.forEach((number) => {
  //   channel.sendToQueue(QUEUE_NAME, Buffer.from(number))
  // })
  // channel.sendToQueue(QUEUE_NAME, Buffer.from(json))

  // const publish = []
  // for (let i = 0; i < 5000; i++) {
  //   publish.push(channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(json)))
  // }
  // Promise.all(publish)

  for (let i = 0; i < 5000; i++) {
    channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(json))
  }
})

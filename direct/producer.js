const EXCHANGE_NAME = 'main'
const EXCHANGE_TYPE = 'direct'
const ROUTING_KEY = 'pdf_create'
const connection = require('../lib/rabbitmq.connection')
const fs = require('fs')

const numbers = ['1', '2', '3', '4', '5', '6', '7']
// const json = JSON.stringify({ name: 'tin' })
// const json = fs.readFileSync('./sample-json.json')

async function initProducer() {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)

  numbers.forEach((number) => {
    channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(number))
  })

  // const publish = []
  // for (let i = 0; i < 5000; i++) {
  //   publish.push(channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(json)))
  // }
  // Promise.all(publish)

  // 50000

  // for (let i = 0; i < 50000; i++) {
  //   channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(json))
  // }
}

initProducer()

const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'direct_logs'
const EXCHANGE_TYPE = 'direct'
const ROUTING_KEY = process.argv[2]

async function initProducer() {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)
  channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(ROUTING_KEY))
}

initProducer()

// const publish = []
// for (let i = 0; i < 5000; i++) {
//   publish.push(channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(json)))
// }
// Promise.all(publish)

// 50000

// for (let i = 0; i < 50000; i++) {
//   channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(json))
// }

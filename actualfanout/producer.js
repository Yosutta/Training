const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'fanout_logs'
const EXCHANGE_TYPE = 'fanout'

const message = process.argv[2]

async function initProducer() {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)
  channel.publish(EXCHANGE_NAME, '', Buffer.from(message))
}

initProducer()

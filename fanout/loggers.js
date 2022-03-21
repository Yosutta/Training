const initConnection = require('../lib/rabbitmq.connection')
// const initChannel = require('../lib/rabbitmq.channel')
const EXCHANGE_NAME = 'logs'
const EXCHANGE_TYPE = 'direct'
const QUEUE_NAME = 'directqueue'

async function initLogger() {
  const conn = await initConnection()
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true })
  await channel.assertQueue(QUEUE_NAME, { durable: true })
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME)
  channel.publish(
    EXCHANGE_NAME,
    '',
    Buffer.from(new Date(Date.now()).toISOString())
  )
}

initLogger()

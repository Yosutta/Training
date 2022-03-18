const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'logs'
const EXCHANGE_TYPE = 'direct'
const QUEUE_NAME = 'directqueue'

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  // await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: false })
  await channel.assertQueue(QUEUE_NAME, { durable: true })
  channel.publish(
    '',
    QUEUE_NAME,
    Buffer.from(new Date(Date.now()).toISOString()),
    { persistent: true }
  ) //???
})

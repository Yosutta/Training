const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'logs'
const EXCHANGE_TYPE = 'fanout'

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: false })
  channel.publish(
    EXCHANGE_NAME,
    '',
    Buffer.from(new Date(Date.now()).toISOString())
  ) //???
})

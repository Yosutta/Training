const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_TYPE = 'fanout'
const EXCHANGE_NAME = 'fanout_logs'

async function initPublisher() {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: false })
  channel.publish(
    EXCHANGE_NAME,
    '',
    Buffer.from(new Date(Date.now()).toISOString())
  ) //???
}

initPublisher()

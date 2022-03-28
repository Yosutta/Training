const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'headers_log'
const EXCHANGE_TYPE = 'headers'

const format = process.argv[2]
const type = process.argv[3]
const headers = { format, type }

const initProducer = async () => {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)
  channel.publish(EXCHANGE_NAME, '', Buffer.from(JSON.stringify(headers)), {
    headers,
  })
}

initProducer()

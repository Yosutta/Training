const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'headers_log'
const QUEUE_NAME = ''

const format = process.argv[2]
const type = process.argv[3]
const xmatch = process.argv[4]
const headers = { format, type, 'x-match': xmatch }
console.log(headers)

const initConsumer = async () => {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME, { exclusive: true })
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, '', headers)
  channel.consume(QUEUE_NAME, (m) => {
    console.log(JSON.parse(m.content.toString()))
    channel.ack(m)
  })
}

initConsumer()

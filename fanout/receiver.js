const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'logs'
const QUEUE_NAME = ''

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  const QUEUE = await channel.assertQueue(QUEUE_NAME, { exclusive: true })
  console.log(QUEUE)
  await channel.bindQueue(QUEUE.queue, EXCHANGE_NAME)
  channel.consume(QUEUE.queue, (m) => {
    console.log(m.content.toString())
    channel.ack(m)
  })
})

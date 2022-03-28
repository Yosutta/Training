const connection = require('../../lib/rabbitmq.connection')
const QUEUE_NAME = 'hello-world'

const initConsumer = async () => {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME, {''})
  channel.consume(QUEUE_NAME, (m) => {
    console.log(m.content.toString())
    channel.ack(m)
  })
}

initConsumer()

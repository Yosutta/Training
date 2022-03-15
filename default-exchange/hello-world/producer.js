const connection = require('../../lib/rabbitmq.connection')
const QUEUE_NAME = 'hello-world'

const str = 'Hello World'

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME)
  channel.sendToQueue(QUEUE_NAME, Buffer.from(str))
})

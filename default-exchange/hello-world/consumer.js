const connection = require('../../lib/rabbitmq.connection')
const QUEUE_NAME = 'hello-world'

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  channel.consume(QUEUE_NAME, (m) => {
    console.log(m.content.toString())
  })
})

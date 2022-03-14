const QUEUE_NAME = 'square'
const connection = require('../lib/rabbitmq.connection')
connection.then(async (conn) => {
  const channel = await conn.createChannel()
  channel.consume(QUEUE_NAME, (m) => {
    // const number = parseFloat(m.content.toString())
    // const square = number * number
    const square = JSON.parse(m.content)
    console.log('processing')
    channel.ack(m)
  })
  console.log('END!!!!')
})

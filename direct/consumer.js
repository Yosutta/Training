const QUEUE_NAME = 'square'
const EXCHANGE_NAME = 'main'
const BINDING_KEY = 'category'
const connection = require('../lib/rabbitmq.connection')

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, BINDING_KEY)
  channel.consume(
    QUEUE_NAME,
    (m) => {
      const number = parseFloat(m.content.toString())
      const square = number * number
      console.log(square)

      // const square = JSON.parse(m.content)

      channel.ack(m)
    },
    { consumerTag: 'Calculate squared number' }
  )
  // console.log('END!!!!')
})

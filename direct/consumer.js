const QUEUE_NAME = 'square'
const EXCHANGE_NAME = 'main'
const BINDING_KEY = 'pdf_create'
const connection = require('../lib/rabbitmq.connection')

async function initConsumer() {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME, { exclusive: true })
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, BINDING_KEY)
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
}

initConsumer()

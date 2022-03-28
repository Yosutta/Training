const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'direct_logs'
const QUEUE_NAME = ''
const BINDING_KEY = process.argv[2]
console.log(`{ BINDING_KEY: '${BINDING_KEY}' }`)

async function initConsumer() {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME, { exclusive: true })
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, BINDING_KEY)
  channel.consume(QUEUE_NAME, (m) => {
    console.log(m.content.toString())
    channel.ack(m)
  })
}

initConsumer()

// channel.consume(
//   QUEUE_NAME,
//   (m) => {
//     const number = parseFloat(m.content.toString())
//     const square = number * number
//     console.log(square)

//     // const square = JSON.parse(m.content)

//     channel.ack(m)
//   },
//   { consumerTag: 'Calculate squared number' }
// )

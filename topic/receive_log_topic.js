const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'topic_logs'
const QUEUE_NAME = ''

// BINDING KEYS
const args = process.argv.slice(2)

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME, { exclusive: true })
  await args.forEach((BINDING_KEY) => {
    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, BINDING_KEY)
  })
  channel.consume(QUEUE_NAME, (m) => {
    console.log(m.content.toString())
  })
})

//  *.orange.*
//  lazy.#  *.*.rabbit

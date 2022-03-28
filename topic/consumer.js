const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'topic_logs'
const QUEUE_NAME = ''

// BINDING KEY
const ROUTING_PATTERNS = process.argv.slice(2)
console.log(ROUTING_PATTERNS)

async function initConsumer() {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME, { exclusive: true })
  ROUTING_PATTERNS.forEach((ROUTING_PATTERN) => {
    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_PATTERN)
  })
  channel.consume(QUEUE_NAME, (m) => {
    console.log(m.content.toString())
  })
}

initConsumer()

//  *.orange.*
//  lazy.#  *.*.rabbit

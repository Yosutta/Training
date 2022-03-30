const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'topic_logs'
const QUEUE_NAME = `Topic-queue${process.argv[2]}`

// BINDING KEY
const ROUTING_PATTERNS = process.argv.slice(3)
console.log(ROUTING_PATTERNS)

async function initConsumer() {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME)
  ROUTING_PATTERNS.forEach((ROUTING_PATTERN) => {
    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_PATTERN)
  })
  channel.consume(QUEUE_NAME, (m) => {
    console.log(m.content.toString())
  })
}

initConsumer()

//  *.categories.*
//  get.#
//  get.*.123

const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'fanout_logs'
const QUEUE_NAME = `Fanout-queue${process.argv[2]}`

async function initConsumer() {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME)
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME)
  channel.consume(QUEUE_NAME, (m) => {
    console.log(m.content.toString())
    channel.ack(m)
  })
}

initConsumer()

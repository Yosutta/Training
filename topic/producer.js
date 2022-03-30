const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_TYPE = 'topic'
const EXCHANGE_NAME = 'topic_logs'

const ROUTING_KEY = process.argv[2]

async function initProducer() {
  const conn = await connection()
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)
  channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(ROUTING_KEY))
}

initProducer()

// <method>.<endpoint>.<id>
//    get  .   post   .123

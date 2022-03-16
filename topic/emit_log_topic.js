const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_TYPE = 'topic'
const EXCHANGE_NAME = 'topic_logs'

const ROUTING_KEY = process.argv[2]
const message = process.argv[3]

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)
  await channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(message))
})

// quick.orange.rabbit "quick.orange.rabbit"
// lazy.orange.elephant "lazy.orange.elephant"
// quick.orange.fox "quick.orange.fox"
// lazy.brown.fox "lazy.brown.fox"
// lazy.pink.rabbit "lazy.pink.rabbit"
// quick.brown.fox "quick.brown.fox"

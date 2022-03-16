const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_NAME = 'direct_logs'

// BINDING KEYS
const severities = process.argv.slice(2)
// const severities = ['info', 'warning', 'error']

const QUEUE_NAME = ''
connection.then(async (conn) => {
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME, { exclusive: true })

  await severities.forEach((severity) => {
    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, severity)
  })

  channel.consume(QUEUE_NAME, (m) => {
    console.log(m.content.toString())
  })
})

//   node receive_log.js info warning
//   node receive_log.js error

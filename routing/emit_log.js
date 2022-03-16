const connection = require('../lib/rabbitmq.connection')
const EXCHANGE_TYPE = 'direct'
const EXCHANGE_NAME = 'direct_logs'

const severity = process.argv[2] //ROUTING KEY
const msg = process.argv[3]

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)
  channel.publish(EXCHANGE_NAME, severity, Buffer.from(msg))
})

//  node emit_log.js info "A new update is available"
//  node emit_log.js warning "Function deprecated"
//  node emit_log.js error "Error on line 69420"

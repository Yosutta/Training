const rabbitmq = require('amqplib')

const stopProgram = (err) => {
  console.error(err)
  process.exit(1)
}

const connectionConfig = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'guest',
  password: 'guest',
  locale: 'en_US',
  frameMax: 0,
  heartbeat: 0,
  vhost: '/',
}

const connection = rabbitmq.connect(connectionConfig, (err, conn) => {
  if (err) stopProgram(err)
})

module.exports = connection

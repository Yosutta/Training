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

var connection = null

async function init() {
  connection = await rabbitmq.connect(connectionConfig)
  connection.on('close', () => {
    setInterval(async () => {
      await init()
      console.log('Reconnecting')
    }, 2000)
  })
}
init()

module.exports = connection

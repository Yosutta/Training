const QUEUE_NAME = 'directqueue'
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
  const maxTimeOut = 5000
  try {
    connection = await rabbitmq.connect(connectionConfig)
    connection.on('close', () => {
      setTimeout(async () => {
        await init()
        console.log('Reconnecting')
      }, maxTimeOut)
      console.log('Close')
    })

    if (connection) {
      console.log('Connected')
      const channel = await connection.createChannel()
      channel.consume(QUEUE_NAME, (m) => {
        console.log(m.content.toString())
        channel.ack(m)
      })
    }
  } catch (err) {
    setTimeout(async () => {
      await init()
      console.log('Reconnecting in catch')
    }, maxTimeOut)
  }
}

init()

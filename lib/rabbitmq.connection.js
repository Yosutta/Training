const rabbitmq = require('amqplib')
const clc = require('cli-color')

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

module.exports = async function initConnection() {
  const maxTimeOut = 5000
  try {
    const connection = await rabbitmq.connect(connectionConfig)

    connection.on('close', () => {
      console.log(clc.cyan('Connection closed'))
      console.log(clc.cyan('Reconnecting to RabbitMQ'))
      setTimeout(initConnection, maxTimeOut)
    })

    connection.on('error', (err) => {
      console.log(clc.red(`Connection error: ${err}`))
      setTimeout(initConnection, maxTimeOut)
    })

    console.log(clc.green('Connection established'))
    return connection
  } catch (err) {
    console.log(`Error: ${err}`)
    console.log(clc.cyan('Reconnecting connection in catch'))
    setTimeout(initConnection, maxTimeOut)
  }
}

// module.exports = () => {
//   return 1
// }

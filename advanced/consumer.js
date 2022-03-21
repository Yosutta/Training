const QUEUE_NAME = 'directqueue'
const initConnection = require('../lib/rabbitmq.connection')
const clc = require('cli-color')

async function initConsumer() {
  const maxTimeOut = 5000
  const INDEX = process.argv[2]
  try {
    const conn = await initConnection()
    const channel = await conn.createChannel()
    channel.on('close', () => {
      console.log(clc.yellow('Channel closed'))
      setTimeout(async () => {
        console.log(clc.cyan('Reconnecting channel'))
        initConsumer()
      }, maxTimeOut)
    })
    if (channel) {
      console.log(clc.green('Channel connection established'))
      console.log(`Consumer ${INDEX} connected`)
      channel.consume(QUEUE_NAME, (m) => {
        console.log(m.content.toString())
        channel.ack(m)
      })
    }
  } catch (err) {
    setTimeout(async () => {
      console.log(clc.cyan('Reconnecting channel in catch'))
      await initConsumer()
    }, maxTimeOut)
  }
}

initConsumer()

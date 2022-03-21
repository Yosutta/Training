const QUEUE_NAME = 'directqueue'
const initConnection = require('../lib/rabbitmq.connection')

async function initConsumer() {
  const maxTimeOut = 5000
  const INDEX = process.argv[2]
  try {
    const conn = await initConnection()
    const channel = await conn.createChannel()
    channel.on('close', () => {
      console.log('Channel closed')
      setTimeout(async () => {
        console.log('Reconnecting channel')
        await initConsumer()
      }, maxTimeOut)
    })
    console.log('Channel connection established')
    console.log(`Consumer ${INDEX} connected`)
    channel.consume(QUEUE_NAME, (m) => {
      console.log(m.content.toString())
      channel.ack(m)
    })
  } catch (err) {
    setTimeout(async () => {
      console.log('Reconnecting channel in catch')
      await initConsumer()
    }, maxTimeOut)
  }
}

initConsumer()

const initConnection = require('../lib/rabbitmq.connection')
const clc = require('cli-color')

// const initChannel = require('../lib/rabbitmq.channel')
// const EXCHANGE_NAME = 'logs'
// const EXCHANGE_TYPE = 'direct'
const QUEUE_NAME = 'directqueue'

async function initProducer() {
  const maxTimeOut = 5000
  try {
    const conn = await initConnection()
    const channel = await conn.createChannel()

    channel.on('close', () => {
      console.log(clc.yellow('Channel closed'))
      console.log(clc.cyan('Recreating channel'))
      setTimeout(initProducer, maxTimeOut)
    })

    channel.on('error', (err) => {
      console.log(clc.red(`Error: ${err}`))
      setTimeout(initProducer, maxTimeOut)
    })

    console.log(clc.green('Channel connection established'))
    await channel.assertQueue(QUEUE_NAME, { durable: true })
    for (let i = 0; i < 1000; i++) {
      channel.publish('', QUEUE_NAME, Buffer.from(`Message ${i}`), {
        persistent: true,
      })
    }
  } catch (err) {
    console.log(`Error: ${err}`)
    console.log(clc.cyan('Recreating channel in catch'))
    setTimeout(initProducer, maxTimeOut)
  }
}

initProducer()

// const initLogger = async () => {
//   const maxTimeOut = 5000
//   try {
//     const channel = await initChannel()
//     channel.on('close', () => {
//       console.log('Logger connection closed')
//       setTimeout(() => {
//         initLogger()
//       }, maxTimeOut)
//     })
//     await channel.assertQueue(QUEUE_NAME, { durable: true })
//     channel.publish(
//       '',
//       QUEUE_NAME,
//       Buffer.from(new Date(Date.now()).toISOString()),
//       { persistent: true }
//     )
//     console.log('Producer established')
//   } catch (err) {
//     setTimeout(() => {
//       initLogger()
//     }, maxTimeOut)
//   }
// }

// initLogger()

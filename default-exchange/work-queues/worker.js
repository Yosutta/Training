const QUEUE_NAME = 'work_queue'
const connection = require('../../lib/rabbitmq.connection')

const miliseconds = process.argv[2]

async function init() {
  const conn = await connection()
  const channel = await conn.createChannel()
  channel.prefetch(100)
  channel.consume(QUEUE_NAME, (m) => {
    setTimeout(() => {
      console.log(`Finished ${m.content.toString()}`)
      channel.ack(m)
    }, 1000)
  })
}

init()

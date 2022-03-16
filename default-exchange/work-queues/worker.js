const QUEUE_NAME = 'work_queue'
const connection = require('../../lib/rabbitmq.connection')

const miliseconds = process.argv[2]

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  channel.prefetch(1)
  channel.consume(QUEUE_NAME, (m) => {
    setTimeout(() => {
      console.log(`Finished ${m.content.toString()}`)
      channel.ack(m)
    }, miliseconds)
  })
})

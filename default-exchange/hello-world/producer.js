const connection = require('../../lib/rabbitmq.connection')
const QUEUE_NAME = 'hello-world'

const str = 'Hello World'

const initProducer = async () => {
  const conn = await connection()
  const channel = await conn.createChannel()
  channel.sendToQueue(QUEUE_NAME, Buffer.from(str))
}

initProducer()

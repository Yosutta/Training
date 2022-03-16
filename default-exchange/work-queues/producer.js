const QUEUE_NAME = 'work_queue'

const connection = require('../../lib/rabbitmq.connection')

const tasks = [
  'Task number 1',
  'Task number 2',
  'Task number 3',
  'Task number 4',
  'Task number 5',
  'Task number 6',
  'Task number 7',
  'Task number 8',
  'Task number 9',
  'Task number 10',
  'Task number 11',
  'Task number 12',
  'Task number 13',
  'Task number 14',
  'Task number 15',
  'Task number 16',
]

connection.then(async (conn) => {
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME)
  tasks.forEach((task) => {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(task))
  })
})

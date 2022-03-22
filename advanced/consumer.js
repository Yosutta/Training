const QUEUE_NAME = 'directqueue'
const initConnection = require('../lib/rabbitmq.connection')
const clc = require('cli-color')
const fs = require('fs')

const mysql = require('mysql2')

const connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  database: 'blog',
  password: 'password',
})

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
      let sum = 0
      channel.consume(QUEUE_NAME, async (m) => {
        sum++
        const d = new Date()
        let ms = d.getMilliseconds()
        console.log(m.content.toString())
        channel.ack(m)
        console.log(`Milisecond ${ms}`)
        // fs.writeFileSync(`test_${INDEX}.txt`, `Milisecond ${ms} \n`, {
        //   flag: 'a+',
        // })
        const timeStamp = Date.now()
        const query = `INSERT INTO post(authorId,title,slug,published,createdAt,content) VALUES (?,?,?,?,?,?)`
        try {
          connection.beginTransaction()
          const [results, fields] = await connection
            .promise()
            .query(query, [
              '1',
              '17 nước công nhận hộ chiếu vaccine Việt Nam',
              `nuoc-cong-nhan-ho-chieu-`,
              '1',
              '2022-01-01',
              `ABCCCC`,
            ])
          connection.commit()
        } catch (err) {
          console.log(`QUERY ERROR: ${err}`)
          connection.rollback()
        }
      })
    }
  } catch (err) {
    console.log(`ERROR: ${err}`)
    setTimeout(async () => {
      console.log(clc.cyan('Reconnecting channel in catch'))
      await initConsumer()
    }, maxTimeOut)
  }
}

initConsumer()

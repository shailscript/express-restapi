import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

// Using morgan for app logs
app.use(morgan('combined'))
app.use(cors())

const app = express()

app.get('/', (req, resp) => {
  return resp.send("Received a get request")
})

app.listen(process.env.PORT, () => {
  console.log('server listening on port 3000')
})
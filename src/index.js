import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes'
const initializeDb = require('./db').initializeDb

const app = express();

// Using body-parser to parse the request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Using morgan for app logs
app.use(morgan('combined'));
app.use(cors());

app.use('/api', routes);

initializeDb(err => {
  app.listen(process.env.PORT || 3000, err => {
    if (err) {
      throw err
    }
    console.log(`server is listening on port ${process.env.PORT || 3000}`)
  })
})
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Using morgan for app logs
app.use(morgan('combined'));
app.use(cors());

const app = express();

app.get('/api/resource', (req, resp) => {
  return resp.send("Received a GET request for a resource");
});

app.post('/api/resource', (req, resp) => {
return resp.send("Received a POST request to a resource");
});

app.get('/api/resource/:id', (req, resp) => {
return resp.send("Received a GET request for a specified resource item");
});

app.put('/api/resource/:id', (req, resp) => {
return resp.send("Received a PUT request for a specified resource item");
});

app.delete('/api/resource/:id', (req, resp) => {
return resp.send("Received a DELETE request for a specified resource item");
});

app.listen(process.env.PORT, () => {
  console.log('server listening on port 3000')
})
import express from 'express';

const app = express();

app.get('/users', (request:any, response:any) => {
    response.json(['Raul', 'Heitor'])
})

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});

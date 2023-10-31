import express from 'express';
import routes from './routes'
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(errors());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333, () => {
  console.log('💡 -----------> Server is running on port 3333');
});

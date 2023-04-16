import express from 'express';
import { todoRouter } from './controllers/todo-controllers';

const app = express();
app.use(express.json());
app.use('/todo', todoRouter);

app.listen(8496, () => {
  console.log(`Server is running on port 8496`);
});

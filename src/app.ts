import express from 'express';
import { todoRouter } from './controllers/todo-controllers';
import { requestsLoggerMiddleware } from './logger/requests-logger';
import { logsRouter } from './controllers/logs-controller';

const app = express();
app.use(express.json());

app.use(requestsLoggerMiddleware);
app.use('/todo', todoRouter);
app.use('/logs', logsRouter);

app.listen(8496, () => {
  console.log(`Server is running on port 8496`);
});

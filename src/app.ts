import express from 'express';
import { todoRouter } from './controllers/todo-controllers';
import { logsRouter } from './controllers/logs-controller';
import { requestsLoggerMiddleware } from './controllers/requests-middleware';

const app = express();
app.use(express.json());

app.use(requestsLoggerMiddleware);
app.use('/todo', todoRouter);
app.use('/logs', logsRouter);

app.listen(9583, () => {
  console.log(`Server is running on port 9583`);
});

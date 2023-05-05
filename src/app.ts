import express from 'express';
import { todoRouter } from './controllers/todo-controllers';
import { requestsLoggerMiddleware } from './logger/requests-logger';

const app = express();
app.use(express.json());

app.use(requestsLoggerMiddleware);
app.use('/todo', todoRouter);

app.get('/logger', (_, res) => {
  // Logger.error('This is an error log');
  // Logger.warn("This is a warn log");
  // Logger.info('This is a info log');
  // Logger.http("This is a http log");
  // Logger.debug("This is a debug log");

  res.send('Hello world');
});

app.listen(8496, () => {
  console.log(`Server is running on port 8496`);
});

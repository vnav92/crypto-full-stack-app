import express from 'express';
import dotenv from 'dotenv';
import { logger } from './utils';
import { exchangeRoutes } from './routes';

dotenv.config();

const app = express();

app.use(exchangeRoutes);

app.listen(process.env.SERVER_PORT, () => {
  logger.info(`Server is listening on port ${process.env.SERVER_PORT}`);
});

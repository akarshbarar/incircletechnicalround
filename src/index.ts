import app from './app';
import logger from './utils/logger';
import * as dotenv from 'dotenv';

dotenv.config();

//* PORT to be listened on
const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`Listening: http://localhost:${port}`);
});
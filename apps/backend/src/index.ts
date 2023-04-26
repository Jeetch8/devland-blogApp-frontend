import app from './app';
import { ValidateEnv } from '@utils/validateEnv';
import { logger } from '@utils/logger';
import { NODE_ENV, PORT } from './config/index';
import { intialFileCleanup } from './utils/fileCleanup';

ValidateEnv();

const env = NODE_ENV || 'development';
const port = PORT || 5000;

// intialFileCleanup();

app.listen(port, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${env} =======`);
  logger.info(`🚀 App listening on the port ${port}`);
  logger.info(`=================================`);
});

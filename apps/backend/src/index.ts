import app from './app';
import { ValidateEnv } from '@utils/validateEnv';
import { logger } from '@utils/logger';
import { NODE_ENV, PORT } from './config/index';
import { intialFileCleanup } from './utils/fileCleanup';
import { seedFakeData } from './utils/fakeDataSeeder';

ValidateEnv();

const env = NODE_ENV || 'development';
const port = PORT || 5000;

// seedFakeData();
// intialFileCleanup()

app.listen(port, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${env} =======`);
  logger.info(`🚀 App listening on the port ${port}`);
  logger.info(`=================================`);
});

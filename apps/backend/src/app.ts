import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './middleware/ErrorHandlers';
import { stream } from '@utils/logger';
import { CREDENTIALS, LOG_FORMAT, ORIGIN } from '@config/index';
import { intializeRoutes } from './api/allRoutes';

const app = express();

app.use(morgan(LOG_FORMAT as string, { stream }));
app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

intializeRoutes(app);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

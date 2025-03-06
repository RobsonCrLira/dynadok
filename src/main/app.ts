import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import { appConfig } from '../config/env';
import routes from '../routes/router';

const env = appConfig.env === 'dev' ? 'dev' : '';

class App {
	private readonly server: express.Application;

	constructor() {
		this.server = express();
		this.initializeMiddlewares();
		this.initializeRoutes();
	}

	private initializeMiddlewares() {
		this.server.use(cors({ origin: '*' }));
		this.server.use(express.json());
		this.server.use(logger(env));
	}

	private initializeRoutes() {
		this.server.use(routes);
	}

	public getServer(): express.Application {
		return this.server;
	}
}

const app = new App();
export default app.getServer();

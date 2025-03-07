import cors from "cors";
import express from "express";
import logger from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { appConfig } from "../config/env";
import routes from "../routes/router";

const env = appConfig.env === "dev" ? "dev" : "";

class App {
	private readonly server: express.Application;

	constructor() {
		this.server = express();
		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeSwagger();
	}

	private initializeMiddlewares() {
		this.server.use(cors({ origin: "*" }));
		this.server.use(express.json());
		this.server.use(logger(env));
	}

	private initializeRoutes() {
		this.server.use(routes);
	}

	private initializeSwagger() {
		const swaggerOptions: swaggerJsdoc.Options = {
			swaggerDefinition: {
				openapi: "3.0.0",
				info: {
					title: "API Dynadok",
					version: "1.0.0",
				},
				servers: [
					{
						url: "http://localhost:3000",
						description: "API documentation for Dynadok project",
					},
				],
			},
			apis: ["./src/routes/*.ts", "./src/routes/**/*.ts"],
		};
		const swaggerDocs = swaggerJsdoc(swaggerOptions);
		this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
	}

	public getServer(): express.Application {
		return this.server;
	}
}

const app = new App();
export default app.getServer();

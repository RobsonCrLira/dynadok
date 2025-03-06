import dotenv from 'dotenv';
import z from 'zod';
import { appConfig } from '../config/env';
import app from './app';

dotenv.config();

try {
	app.listen(appConfig.port, () => {
		console.log(`Server running on port ${appConfig.port}`);
	});
} catch (error) {
	if (error instanceof z.ZodError) {
		const errors = error.errors.map((err) => err.message);
		console.error('Error starting server:', errors);
	}
	console.error('Error starting server:', error);
}

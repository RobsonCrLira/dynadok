import { UploadMiddleware } from '../../middleware/UploadMiddleware';

export const makeUploadMiddlewareFactory = (extTypes: string[], fileSize: number) => {
	const uploadConfig = new UploadMiddleware();
	return uploadConfig.getConfig({ extTypes, fileSize });
};

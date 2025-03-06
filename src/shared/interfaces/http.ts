export interface HttpResponse {
	statusCode: number;
	body: any;
}

export interface HttpRequest {
	body?: any;
	file?: any;
	files?: any;
	user?: Payload;
	headers?: any;
	params?: any;
	query?: any;
}

export type Payload = {
	user_id: number;
	sap_id: number;
	role: {
		role_id: number;
		name: string;
	};
};

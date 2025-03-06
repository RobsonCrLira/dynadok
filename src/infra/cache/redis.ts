import { RedisClientType, createClient } from 'redis';

class RedisCache {
	private readonly client: RedisClientType;

	constructor() {
		this.client = createClient({
			url: process.env.REDIS_URL || 'redis://localhost:6379',
		});

		this.client.on('error', (err) => console.error('Redis Client Error', err));
	}

	async connect(): Promise<void> {
		await this.client.connect();
	}

	getClient(): RedisClientType {
		return this.client;
	}
}

const redisCache = new RedisCache();
redisCache.connect();

export default redisCache;

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

	async getValue(key: string): Promise<string | null> {
		const reply = await this.client.get(key);
		return reply;
	}

	async setValue(key: string, value: string, expirationInSeconds?: number): Promise<void> {
		if (expirationInSeconds) {
			await this.client.set(key, value, {
				EX: expirationInSeconds,
			});
		} else {
			await this.client.set(key, value);
		}
	}
}

const redisCache = new RedisCache();
redisCache.connect();

export default redisCache;

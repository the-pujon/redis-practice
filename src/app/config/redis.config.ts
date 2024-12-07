import { createClient } from "redis";
import config from ".";

// Create Redis Client
const redisClient = createClient({
    url: config.redis_url as string || '127.0.0.1:6379' || 'redis://localhost:6379'
})

// Handle Redis Client Errors
redisClient.on('error', (err) => console.log('Redis Cliend Error', err))

// Handle Redis Client Connection log
redisClient.on('connect', () => console.log('Connected to Redis'))

// Connect to Redis
redisClient.connect().catch((err) => console.log(err))

export default redisClient

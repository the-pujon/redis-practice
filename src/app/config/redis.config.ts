import { createClient } from "redis";

// Create Redis Client
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: (retries) => {
            // Maximum retry delay of 3 seconds
            return Math.min(retries * 50, 3000)
        }
    }
})

// Handle Redis Client Errors
redisClient.on('error', (err) => console.error('Redis Client Error:', err))

// Handle Redis Client Connection log
redisClient.on('connect', () => console.log('Redis Client Connected'))
redisClient.on('ready', () => console.log('Redis Client Ready'))
redisClient.on('reconnecting', () => console.log('Redis Client Reconnecting'))

// Connect to Redis
redisClient.connect().catch(console.error)

export default redisClient

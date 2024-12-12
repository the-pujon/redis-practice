import redisClient from "../config/redis.config"

// Cache Data in redis
export const cacheData = async (key: string, data: string, expirationTime = 3600) => {
    try {
        await redisClient.setEx(key, expirationTime, data)
        console.log(`Data cached for key: ${key}`)
    } catch (error) {
        console.error('Redis Cache Error:', error)
    }
}

// Get Data from redis
export const getCachedData = async (key: string): Promise<string | null> => {
    try {
        const data = await redisClient.get(key)
        console.log(`Cache ${data ? 'hit' : 'miss'} for key: ${key}`)
        return data
    } catch (error) {
        console.error('Redis Get Cache Error:', error)
        return null
    }
}

// Delete Data from redis
export const deleteCacheData = async (key: string) => {
    try{
        await redisClient.del(key)
    }catch(err){
        console.log("Redis Cache Error while deleting data", err)
    }
}

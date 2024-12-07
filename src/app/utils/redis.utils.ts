import redisClient from "../config/redis.config"

// Cache Data in redis
export const cacheData = async (key: string, data: any, expirationTime: number) => {
    try{
        await redisClient.setEx(key, expirationTime, JSON.stringify(data))
    }catch(err){
        console.log("Redis Cache Error while setting data", err)
    }
}

// Get Data from redis
export const getCachedData = async (key: string) => {
    try{
        const cachedData = await redisClient.get(key)
        return cachedData ? JSON.parse(cachedData) : null
    }catch(err){
        console.log("Redis Cache Error while getting data", err)
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

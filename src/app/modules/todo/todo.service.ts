import { cacheData, getCachedData } from "../../utils/redis.utils"

const CACHE_KEY = 'todos'
const CACHE_TTL = 3600 // 1 hour in seconds
const API_URL = 'https://jsonplaceholder.typicode.com/todos'

const getTodoDataService = async () => {
    const start = Date.now()
    try {
        const cachedData = await getCachedData(CACHE_KEY)
        
        if (cachedData) {
            const duration = Date.now() - start
            console.log(`Cache hit: Retrieved data in ${duration}ms`)
            return JSON.parse(cachedData)
        }

        const apiStart = Date.now()
        const response = await fetch(API_URL)
        const data = await response.json()
        const apiDuration = Date.now() - apiStart
        console.log(`API call took ${apiDuration}ms`)

        await cacheData(CACHE_KEY, JSON.stringify(data), CACHE_TTL)
        
        const totalDuration = Date.now() - start
        console.log(`Total operation took ${totalDuration}ms`)
        
        return data
    } catch (error) {
        console.error("Error in getTodoDataService:", error)
        throw error
    }
}

export const TodoService = { getTodoDataService }
const fakeData = 'https://jsonplaceholder.typicode.com/todos'

const getTodoDataService = async () => {
    const response = await fetch(fakeData)
    const data = await response.json()
    return data
}

export const TodoService = { getTodoDataService }
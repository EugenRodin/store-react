import {useFetch} from "../hooks/useFetch.ts"
import {TodoInterface} from "../types/Todo.interface.ts"

const Todos = () => {
    const {data: todos, error, isLoading} = useFetch<TodoInterface>('https://jsonplaceholder.typicode.com/todos', 20)

    return <div>
        <h1>Todos Page</h1>
        {isLoading && <h2>Завантаження...</h2>}
        {error && <h2 className="error">{error}</h2>}
        {!isLoading && !error && (
            <ul>{!!todos.length && todos.map((todos: TodoInterface) => <li key={todos.id}>{todos.title}</li>)}</ul>
        )}
    </div>
}

export default Todos
import {useFetch} from "../hooks/useFetch.ts"
import {UserInterface} from "../types/User.Interface.ts"

const Users = () => {
    const {data: users, error, isLoading} = useFetch<UserInterface>('https://jsonplaceholder.typicode.com/users')

    return (
        <div>
            <h1>Users page</h1>
            {isLoading && <h2>Loading...</h2>}
            {error && <h2 className="error">{error}</h2>}
            {!isLoading && !error && (
                <ul>{!!users.length && users.map((user: UserInterface) => <li key={user.id}>{user.name}</li>)}</ul>
            )}
        </div>
    )
}

export default Users
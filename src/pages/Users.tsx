import {UserInterface} from "../types/User.Interface.ts"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch} from "../components/redux/store.ts"
import {selectUsers, selectUsersLoading, selectUsersError, fetchAllUsers} from "../components/redux/userSlice.ts"
import {useEffect} from "react";

const Users = () => {
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector(selectUsers)
    const isLoading = useSelector(selectUsersLoading)
    const error = useSelector(selectUsersError)

    useEffect(() => {
        dispatch(fetchAllUsers('https://jsonplaceholder.typicode.com/users'))
    }, [dispatch])

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
import {NavLink} from "react-router-dom"
import {LinkInterface} from "../../types/LinkInterface.ts"
import {useDispatch} from "react-redux"
import {RootState} from "../redux/store.ts"
import {useSelector} from "react-redux"
import {login, logout} from "../redux/authSlice.ts"

const links: LinkInterface[] = [
    {path: "/", name: "Home"},
    {path: "/posts", name: "Posts"},
    {path: "/users", name: "Users"},
    {path: "/todos", name: "Todos"},
]


const Navbar = () => {
    const dispatch = useDispatch()
    const {isLogged} = useSelector((state: RootState) => state.auth)

    console.log(isLogged)

    const handleLogin = () => {
        dispatch(login())
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <nav className="navbar">
            <div className="container">
                <ul className="navbar__list">
                    {links.map((link: LinkInterface, index: number) => (
                        <li key={index} className="navbar__item">
                            <NavLink to={link.path} className="navbar__link">
                                {link.name}
                            </NavLink>
                        </li>
                    ))}

                    {isLogged ? (
                        <li className="navbar__item">
                            <button className="navbar__link" onClick={handleLogout}>Logout</button>
                        </li>
                    ) : (
                        <li className="navbar__item">
                            <button className="navbar__link" onClick={handleLogin}>Login</button>
                        </li>
                    )}
                </ul>

            </div>
        </nav>
    )
}

export default Navbar
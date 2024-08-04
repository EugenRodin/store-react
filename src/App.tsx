import {useIdleTimer} from "react-idle-timer"
import {useState, useEffect} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar.tsx"
import Users from "./pages/Users.tsx"
import Posts from "./pages/Posts.tsx"
import Home from "./pages/Home.tsx"
import Todos from "./pages/Todos.tsx"

const timeout = 10_000
const promptBeforeIdle = 5_000

const App = () => {
    const [state, setState] = useState<string>('Active')
    const [remaining, setRemaining] = useState<number>(timeout)
    const [open, setOpen] = useState<boolean>(false)

    const onIdle = () => {
        setState('Idle')
        setOpen(false)
    }

    const onActive = () => {
        setState('Active')
        setOpen(false)
    }

    const onPrompt = () => {
        setState('Prompted')
        setOpen(true)
    }

    const {getRemainingTime, activate} = useIdleTimer({
        timeout,
        onIdle,
        onActive,
        onPrompt,
        promptBeforeIdle,
        throttle: 500
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000))
        }, 500)

        return () => clearInterval(interval)
    }, [getRemainingTime])

    const HandleStillHere = () => {
        activate()
    }

    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/todos" element={<Todos />} />
                </Routes>
                <p className="status">Status: {state}</p>

                <div
                    className="modal"
                    style={{
                        display: open ? 'flex' : 'none'
                    }}
                >
                    <h3 className="modal__title">Are you still here?</h3>
                    <p className="modal__text">Logging out in {remaining} seconds</p>
                    <button className="modal__button" onClick={HandleStillHere}>Im still here</button>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
import React, { useContext, useState } from 'react'
import Api from "../../api/Api"
import { AppContext } from "../../context/AppContext"
import { useNavigate } from "react-router-dom"

function Login() {

    const { setAuthenticated, setBearerToken } = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const login = async () => {
        try {
            const body = {
                username,
                password
            }
            const responseUser = await Api.post('/auth/login', body)
            if (responseUser.data.status === "success") {
                setAuthenticated(true)
            } else {
                return "error"
            }
            const responseApi = await Api.post('/auth/login', body)
            if (responseApi.data.status === "success") {
                setBearerToken(responseApi.data.data.refreshToken)
            } else {
                return "error"
            }
            navigate(`/`)
        } catch (error) {
            return "error"
        }
    }

    return (
        <div className="auth">
            <div className="card">
                <div>
                    <p>Username</p>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="submit" onClick={() => login()} ><p>Login</p></div>
            </div>
        </div>
    )
}

export default Login
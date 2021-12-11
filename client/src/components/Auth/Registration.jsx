import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Api from "../../api/Api"

function Registration() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const register = async () => {
        try {
            const body = {
                username,
                password
            }
            const responseUser = await Api.post('/auth/register', body)
            if (responseUser.data.status === "success") {
                navigate(`/login`)
            } else {
                navigate(`/register`)
            }
        } catch (error) {
            console.log(error)
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
                <div className="submit" onClick={() => register()} ><p>Register</p></div>
            </div>
        </div>
    )
}

export default Registration

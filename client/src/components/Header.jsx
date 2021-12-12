import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { AppContext } from '../context/AppContext'

function Header() {

    const { authenticated, setAuthenticated, setBearerToken, creator } = useContext(AppContext)
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("")
    const pathname = window.location.pathname

    useEffect(() => {
        setActiveMenu(pathname)
    }, [pathname, setActiveMenu])

    return (
        <div className="headerWrapper">
            <div className="header">
                <div className="upperMenu">
                    <div className="logo" onClick={() => navigate(`/`)}>
                        <p>CardaNFT</p>
                    </div>
                    {
                        !authenticated
                        ?
                            <div className="auth">
                                <div className="action" onClick={() => navigate("/login")}>
                                    <p>Login</p>
                                </div>
                                <div className="action" onClick={() => navigate("/register")}>
                                    <p>Register</p>
                                </div>
                            </div>
                        :
                        <div className="auth">
                            <div className="action" 
                            onClick={() => {
                                    setAuthenticated(false)
                                    setBearerToken("")
                                    navigate(`/`)
                                }
                            }
                            ><p>Logout</p></div>
                            <div className="creator" >
                                <p>{creator.creator_name}</p>  
                            </div>
                        </div>
                    }
                </div>
                <div className="lowerMenu">
                    <div className="menu">
                        <ul>
                            <li onClick={() => navigate("/")}><p className={activeMenu === "/" ? "black" : ""}>NFTs</p><div className={activeMenu === "/" ? "menuItemBorder active" : "menuItemBorder"}></div></li>
                            <li onClick={() => navigate(`/creators`)}><p className={activeMenu === "/creators" ? "black" : ""}>Creators</p><div className={activeMenu === "/creators" ? "menuItemBorder active" : "menuItemBorder"}></div></li>
                            <li onClick={() => navigate(`/collections`)}><p className={activeMenu === "/collections" ? "black" : ""}>Collections</p><div className={activeMenu === "/collections" ? "menuItemBorder active" : "menuItemBorder"}></div></li>
                            {/* <li><p>Wallet</p><div className="menuItemBorder"></div></li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

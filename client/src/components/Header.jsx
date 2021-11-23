import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { AppContext } from '../context/AppContext'

function Header() {

    const navigate = useNavigate();
    const { activeMenu, setActiveMenu } = useContext(AppContext)
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
                    <div className="search">
                        <input type="search" name="" id="" placeholder="Search NFTs, Collections and Creators" />
                        <div className="searchIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="lowerMenu">
                    <div className="menu">
                        <ul>
                            <li onClick={() => navigate("/singles")}><p>NFTs</p><div className={activeMenu === "/singles" ? "menuItemBorder active" : "menuItemBorder"}></div></li>
                            <li onClick={() => navigate(`/creators`)}><p>Creators</p><div className={activeMenu === "/creators" ? "menuItemBorder active" : "menuItemBorder"}></div></li>
                            <li onClick={() => navigate(`/collections`)}><p>Collections</p><div className={activeMenu === "/collections" ? "menuItemBorder active" : "menuItemBorder"}></div></li>
                            <li><p>Wallet</p><div className="menuItemBorder"></div></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

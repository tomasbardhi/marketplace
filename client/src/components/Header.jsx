import React from 'react'

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <p>DeceNFT</p>
            </div>
            <div className="search">
                <input type="search" name="" id="" />
            </div>
            <div className="menu">
                <ul>
                    <li>Explore</li>
                    <li className="active">Stats</li>
                    <li>Collections</li>
                    <li>Wallet</li>
                </ul>
            </div>
        </div>
    )
}

export default Header

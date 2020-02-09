import React from 'react';
import {Link} from 'react-router-dom';
export default function NavBar() {
    return (
        <>
        <nav className="navbar">
            <ul className="main-nav">
                <li>
                    <Link  className="nav-link" to="/" >Home</Link>
                </li>
                <li>
                    <Link  className="nav-link" to="/search" >Search</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}
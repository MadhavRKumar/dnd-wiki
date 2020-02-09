import React from 'react';
import { Link } from 'react-router-dom';
export default function NavBar() {
    return (
        <>
            <nav className="navbar">
                <ul className="main-nav">
                    <li>
                        <Link className="nav-link" to="/create" >Create Article</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
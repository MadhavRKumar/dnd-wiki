import React from 'react';
import Search from './Search';
import logo from './logo.png';

export default function Home() {
    return (
    <div className="flex-container-centered">
        <img src={logo} alt="Green DnD 5e with the word WIKI underneath" className="logo"/>
        <Search />
    </div>);
}
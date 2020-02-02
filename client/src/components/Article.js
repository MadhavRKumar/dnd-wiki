import React from 'react';
import '../App.css';

export default function Article({title, children}) {
    return (
            <article className="article">
                <header className="title">
                    <h1>{title}</h1>
                </header>
                {children}
            </article>
    );
 
}

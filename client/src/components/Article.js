import React from 'react';
import '../App.css';

export default function Article({children}) {
    return (
            <article className="article">
                {children}
            </article>
    );
 
}

import React from 'react';

export default function Article({children}) {
    return (
            <article className="article">
                {children}
            </article>
    );
 
}

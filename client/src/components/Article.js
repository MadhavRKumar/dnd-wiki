import React from 'react';

function Article(props) {
    return (
    <div>
        <h1 className="title">{props.title}</h1>
        <p className="text">{props.text}</p>    
    </div>
    )
}

export default Article;
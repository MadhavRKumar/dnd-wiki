import React from 'react';

export default function ArticleContent({text}) {
    return (
        <p className="text trix-content" dangerouslySetInnerHTML={text}></p>
    );
}
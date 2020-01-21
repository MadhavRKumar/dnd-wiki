import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function parseTitle(pageTitle) {
    return pageTitle.replace('_', ' ');
}
function Article() {
    let { pageTitle } = useParams();
    let parsedTitle = parseTitle(pageTitle);
    let [text, setText] = useState(null);
    let callAPI = async (pageTitle) => {
        const response = await fetch(`/${pageTitle}`);
        const body = await response.json();
        if (response.status !== 200) 
        {
             throw Error(body.message);
        }
        return body;
    };

    useEffect(() => {
        callAPI(parsedTitle).then(res => setText(res.text)).catch(err => console.error(err));
    });
    


    return (
        <div>
            <h1 className="title">{parsedTitle}</h1>
            <p className="text">{text}</p>
        </div>
    );
}

export default Article;
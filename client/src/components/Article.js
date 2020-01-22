import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css'

function parseTitle(pageTitle) {
    let str = pageTitle.replace('_', ' ');
    let cap = str.charAt(0).toUpperCase();
    return cap + str.substring(1);
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
    

    function getRawHTML() {
        return {__html: text}
    }

    return (
        <div className="article">
            <div className="title">
                <h1>{parsedTitle}</h1>
            </div>
            <div className="text" dangerouslySetInnerHTML={getRawHTML()}></div>
        </div>
    );
}

export default Article;
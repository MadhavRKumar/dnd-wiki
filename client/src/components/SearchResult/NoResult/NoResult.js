import React from 'react';

export default function NoResult({ query }) {
    let text = query ? `No results for '${query}'` : "Search for an Article";
    return (
        <li className='result'>
            <p className='text'>{text}</p>
        </li>
    );
}

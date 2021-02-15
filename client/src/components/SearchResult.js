import React, { useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import capitalize from '../util/capitalize';
import useLoading from '../hooks/useLoading';
import useSearch from '../hooks/useSearch';
import Loader from './Loader';


export default function SearchResult() {
    let isLoading = useLoading();
	let { search }= useLocation();
	let  query  = new URLSearchParams(search).get('query');
	let res = useSearch(query);

    if (isLoading) {
        return <Loader />;
    }
    else {
        return <ResultList query={query} results={res}/>;
    }

}


function ResultList(props) {
	const { results, query } = props;

	let list;
	if(results.length !== 0) {
		list = results.map((obj) => <Result key={obj.page_title} title={obj.page_title} text={obj.text} />) 
	} else {
		list = <NoResult query={query} />;
	}

	return (
		<ul className='result-list' >
			{list}
		</ul>
	);

}

function Result(props) {
    const { title, text } = props;
    const capTitle = capitalize(title);
    const truncText = {__html:text.split(' ').slice(0, 20).join(' ')};
    return (
        <li className='result'>
            <Link to={'/article/' + title}>
                <h2>{capTitle}</h2>
                <p className='text trix-content' dangerouslySetInnerHTML={truncText}></p>
            </Link>
        </li>
    );
}

function NoResult({ query }) {
    let text = query ? `No results for '${query}'` : "Search for an Article";
    return (
        <li className='result'>
            <p className='text'>{text}</p>
        </li>
    );
}

import React from 'react';
import { useLocation } from 'react-router-dom';
import useLoading from '../../hooks/useLoading';
import useSearch from '../../hooks/useSearch';
import Loader from '../Loader';
import ResultList from './ResultList';


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

import React from 'react';
import Search from './Search';
import { useLocation, Link } from 'react-router-dom';
import capitalize from '../util/capitalize';
import useLoading from '../hooks/useLoading';
import Loader from './Loader';

export default function SearchResult() {
    const location = useLocation();
    let isLoading = useLoading();

    const res = location.state ? location.state.result : false;
    const list = (res && res.length!==0) ? res.map((obj) => <Result key={obj.page_title} title={obj.page_title} text={obj.text} />) : <NoResult/>;

    if(isLoading) {
        return <Loader/>;
    }
    else {
        return (
            <>
                <Search />
                <ul className='result-list'>
                    {list}
                </ul>
            </>
        );
    }

}

function Result(props) {
    const { title, text } = props;
    const capTitle = capitalize(title); 
    const truncText = text.split(' ').slice(0, 20).join(' ');
    return (
        <li className='result'>
        <Link to={'/article/'+title}>
            <h2>{capTitle}</h2>
            <p className='text'>{truncText}</p>
        </Link>
        </li>
    )
}

function NoResult() {
    return (
        <li className='result'>
            <p className='text'>Sorry, no results were found!</p>
        </li>
    )
}
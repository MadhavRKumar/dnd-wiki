import React from 'react';
import Search from '../Search';
import Loader from '../Loader';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import useLoading from '../../hooks/useLoading';

export default function Home() {
    let isLoading = useLoading();

    if (isLoading) {
        return <Loader />;
    }
    else {
        return (
            <div className="flex-container-centered">
                <img src={logo} alt="Green DnD 5e with the word WIKI underneath" className="logo" />
                <Search />
                <Link className="create-link" to="/create" >Create Article</Link>
            </div>);
    }

}

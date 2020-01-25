import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import useAPI from '../hooks/useAPI';
import Loader from './Loader';



function Article() {
   let {title, text, isLoading} = useAPI();
   if(isLoading){
    return (<Loader/>);
   }
   else {
    return (
        <div className="article-container">
            <div className="article">
                <div className="title">
                    <h1>{title}</h1>
                </div>
                <div className="text trix-content" dangerouslySetInnerHTML={text}></div>
            </div>
            <Link className="edit-button" to={`/edit/${title}`}>
                Edit Article
            </Link>

        </div>

    );
   }
 
}

export default Article;
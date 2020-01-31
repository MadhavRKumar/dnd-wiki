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
            <article className="article">
                <header className="title">
                    <h1>{title}</h1>
                </header>
                <p className="text trix-content" dangerouslySetInnerHTML={text}></p>
            </article>
            <Link className="edit-button" to={`/edit/${title}`}>
                Edit Article
            </Link>

        </div>

    );
   }
 
}

export default Article;
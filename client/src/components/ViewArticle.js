import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import useAPI from '../hooks/useAPI';
import Loader from './Loader';
import Article from './Article';
import ArticleContent from './ArticleContent';
import Title from './Title';


export default function ViewArticle() {
   let {title, text, isLoading} = useAPI();
   if(isLoading){
    return (<Loader/>);
   }
   else {
    return (
        <>
            <Article>
                <Title title={title}/>
                <ArticleContent text={text}/>
            </Article>
            <Link className="edit-button" to={`/edit/${title}`}>
                Edit Article
            </Link>
        </>
    );
   }
}

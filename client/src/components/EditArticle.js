import React, { useRef } from 'react';
import useAPI from '../hooks/useAPI';
import { useHistory } from 'react-router-dom';
import Loader from './Loader';
import Editor from './Editor';
import Article from './Article';
import Title from './Title';

export default function EditArticle() {

    let { pageTitle, title, text, isLoading } = useAPI();

    let inputEl = useRef(null);
    let history = useHistory();


    let handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        var urlencoded = new URLSearchParams();
        urlencoded.append('text', inputEl.current.value);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch('/' + pageTitle, requestOptions)
            .then(response => response.text())
            .then(result => {
                alert(result);
                history.push('/article/' + pageTitle);
            })
            .catch(error => console.log('error', error));
    };

    if (isLoading) {
        return (
            <Loader />
        );
    }
    else {
        return (
            <>
                <Article>
                    <Title title={title}/>
                    <Editor input={inputEl} text={text} />
                </Article>
                <button className="edit-button" onClick={handleSubmit}>Submit</button>
            </>
        );
    }
}
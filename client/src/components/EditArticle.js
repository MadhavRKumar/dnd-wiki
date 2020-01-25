import React, { useRef } from 'react';
import useAPI from '../hooks/useAPI';
import { useHistory } from 'react-router-dom';

export default function EditArticle() {

    let {pageTitle, title, text, isLoading} = useAPI();

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
        
        fetch('/'+pageTitle, requestOptions)
          .then(response => response.text())
          .then(result => {
              alert(result);
              history.push('/article/'+pageTitle);
          })
          .catch(error => console.log('error', error));
    };

    if (!isLoading) {
        return (
            <div className="article-container">
                <div className="article">
                    <div className="title">
                        <h1>{title}</h1>
                    </div>
                    <form>
                        <trix-editor input="input"></trix-editor>
                        <input id="input" ref={inputEl} type="hidden" name="content" value={text.__html}></input>
                    </form>

                </div>
                <button className="edit-button" onClick={handleSubmit}>Submit</button>
            </div>
        );
    }
    else {
        return (<div>Loading</div>);
    }
}
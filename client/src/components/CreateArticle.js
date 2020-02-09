import React, {useRef} from 'react';
import Article from './Article';
import Editor from './Editor';
import { useHistory } from 'react-router-dom';

export default function CreateArticle() {
    let input = useRef(null);
    let titleInput = useRef(null);
    let history = useHistory();

    function handleSubmit() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        let title = titleInput.current.value;
        var urlencoded = new URLSearchParams();
        urlencoded.append('text', input.current.value);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch('/' + title, requestOptions)
            .then(response => response.text())
            .then(result => {
                alert(result);
                history.push('/article/' + title);
            })
            .catch(error => console.log('error', error));
    }


    return (
        <>
        <Article>
            <input ref={titleInput} type="text" className="title-input"/>
            <Editor input={input} text={{}}/>
        </Article>
        <button className="edit-button" onClick={handleSubmit}>Submit</button>
        </>
    );
}
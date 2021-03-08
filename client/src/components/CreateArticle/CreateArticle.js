import React, {useRef} from 'react';
import Article from '../Article';
import Editor from '../Editor';
import { useHistory } from 'react-router-dom';

export default function CreateArticle() {
    let input = useRef(null);
    let titleInput = useRef(null);
    let history = useHistory();

    function handleSubmit() {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        const title = titleInput.current.value;
        const text = input.current.value;
        let urlencoded = new URLSearchParams();
        urlencoded.append('text',text);
        if(title && text) {
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
    
            fetch('/api/' + title, requestOptions)
                .then(response => response.text())
                .then(result => {
                    alert(result);
                    history.push('/article/' + title);
                })
                .catch(error => console.log('error', error));
        }
        else {
            alert("Article Body and Title required");
        }
   
    }


    return (
        <>
        <Article>
            <input ref={titleInput} type="text" name="title" placeholder="Title" className="title-input"/>
            <Editor input={input} text={{}}/>
        </Article>
        <button className="edit-button" onClick={handleSubmit}>Submit</button>
        </>
    );
}

import React, {useRef} from 'react';
import { useHistory } from 'react-router-dom';

export default function Search(props) {
    const input = useRef(null);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch('/search?query=' + input.current.value, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.length === 1) {
                history.push('/article/' + result[0].page_title);
            }
        })
        .catch(error => console.error('Error: ', error));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input ref={input} type="search" placeholder="Search..." className="search">
            </input>
        </form>
    )
}
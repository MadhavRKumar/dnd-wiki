import React, {useRef} from 'react';
import { useHistory } from 'react-router-dom';

export default function Search() {
    const input = useRef(null);
    const history = useHistory();

    const handleSubmit = (event) => {
		event.preventDefault();
		history.push('/search?query='+input.current.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input ref={input} type="search" placeholder="Search..." className="search" aria-label="Search for an article">
            </input>
        </form>
    )
}

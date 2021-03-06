import React from 'react';
import capitalize from '../../../util/capitalize';
import { Link } from 'react-router-dom';

export default function Result(props) {
    const { title, text } = props;
    const capTitle = capitalize(title);
    const truncText = {__html:text.split(' ').slice(0, 20).join(' ')};
    return (
        <li className='result'>
            <Link to={'/article/' + title}>
                <h2>{capTitle}</h2>
                <p className='text trix-content' dangerouslySetInnerHTML={truncText}></p>
            </Link>
        </li>
    );
}

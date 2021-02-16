import React from 'react';
import Result from '../Result';
import NoResult from '../NoResult';

export default function ResultList(props) {
	const { results, query } = props;

	let list;
	if(results.length !== 0) {
		list = results.map((obj) => <Result key={obj.page_title} title={obj.page_title} text={obj.text} />) 
	} else {
		list = <NoResult query={query} />;
	}

	return (
		<ul className='result-list' >
			{list}
		</ul>
	);

}

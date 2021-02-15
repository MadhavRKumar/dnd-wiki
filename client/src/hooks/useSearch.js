import { useState, useEffect } from 'react';

let callAPI = async (searchQuery) => {
	const encodedQuery = encodeURIComponent(searchQuery);
    const response = await fetch(`/api/search?query=${encodedQuery}`);
    const body = await response.json();
    if (response.status !== 200) 
    {
         throw Error(body.message);
    }
    return body;
};

const useSearch = (searchQuery) => {
	let [results, setResult] = useState([]); 	
	useEffect(() => {
		callAPI(searchQuery).then(
			res => {
				setResult(res);
			}
		)
	},[searchQuery]);

	return results;
}

export default useSearch;

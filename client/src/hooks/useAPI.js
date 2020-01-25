import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function parseTitle(pageTitle) {
    let str = pageTitle.replace('_', ' ');
    let cap = str.charAt(0).toUpperCase();
    return cap + str.substring(1);
}

let callAPI = async (pageTitle) => {
    const response = await fetch(`/${pageTitle}`);
    const body = await response.json();
    if (response.status !== 200) 
    {
         throw Error(body.message);
    }
    return body;
};


const useAPI = () => {
    let { pageTitle } = useParams();
    let title = parseTitle(pageTitle);
    let [text, setText] = useState({__html:''});
    let [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let hasRun = false;
            
        callAPI(title)
        .then(res => {
            if(!hasRun) {
                setText({__html:res.text});
                setLoading(false);
            }           
        })
        .catch(err => console.error(err));
        

        return () => {
            hasRun = true;
        };
    }, [title]);


    return {pageTitle, title, text, setText, isLoading};
    
};



export default useAPI;
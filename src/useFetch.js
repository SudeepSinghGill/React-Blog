import { useState, useEffect } from "react";

const useFetch = (url) => {    
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setTimeout(() => {
            fetch(url, {signal: abortController.signal})
                .then((res) => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data for the resource');
                    }
                    console.log(res);
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch((err) => {
                    if(err.name === 'AbortError') {
                        console.log('Fetch Aborted');
                    } 
                    else {
                        setIsLoading(false);
                        setError(err.message);
                        setData(null);
                    }
                });
        }, 1000);

        return () => abortController.abort();
    }, [url]);

    return { data, isLoading, error };
}

export default useFetch;
import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "HTTP request failed");
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
    // Custom hook to handle HTTP requests
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(initialData || null);


    function clearData(){
        setData(initialData || null);
    }

    const sendRequest = useCallback(async function sendRequest(data){
        setIsLoading(true);
        try{
        const reData = await sendHttpRequest(url, {
            ...config, body : data});
        setData(reData);
        }
        catch(error){
            setError(error.message || "Something went wrong!");

        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        // Effect to send the HTTP request when the component mounts or dependencies change
        if((config && (config.method === "GET" || !config.method)) || !config) {
            // If config is provided and method is GET, or config is not provided, send the request
            sendRequest();
            return;
        }
    }, [sendRequest]);


    return {
        isLoading,
        error,
        data,
        sendRequest, // Expose the sendRequest function for manual invocation
       clearData
    }
}

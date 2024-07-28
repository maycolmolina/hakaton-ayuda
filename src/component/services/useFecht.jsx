import  { useEffect, useState } from 'react'

const UseFecht = (ApiUrl) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [constroller, setConstroller] = useState(null)
    const [count, setCount] = useState(0)

    useEffect(() => {
        setData(null)
        setLoading(true);
        setError(null);
        const abortController=new AbortController()
        setConstroller(abortController)

        fetch(ApiUrl,{signal:abortController.signal})
            .then(res => res.json())
            .then(data => {setData(data)})
            .catch(err =>{
                setError(err)
            } )
            .finally(() => setLoading(false))
        return () => {abortController.abort()}
    }, [count])
    const handlecancelrequest=()=> {
        if(constroller){
            constroller.abort();
        }
    }
    const refresh=()=> {
        setCount(count+1)
    }
    
    return {data,loading,error,handlecancelrequest,refresh};
}
export default UseFecht;

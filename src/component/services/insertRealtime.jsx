import { useEffect, useState } from 'react';
import { getDatabase ,push,ref} from "firebase/database"; 


const userInserrealtime=(objetoEn,nombreNodo)=>{
    const [cargando, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const db = getDatabase();
        const Ref = ref(db,nombreNodo);
        setLoading(true)
        setError(null)
        push(Ref, objetoEn)
        .then( ()=> {console.log('esto es un exito total')})
        .catch(err => {
            console.log(err.message)
            setError(err);})
        .finally( () => {setLoading(false);});
    },[])
    return { cargando, error};
}

export default userInserrealtime;



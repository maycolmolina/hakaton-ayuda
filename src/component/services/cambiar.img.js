
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";

export const setstorage = async (namenodo,namefile,file)=>{
    try {    
        const storage = getStorage();
        const referencia = ref(storage, namenodo+namefile+'.jpg');
        await uploadBytes(referencia, file);
        const url = await getDownloadURL(referencia);
        return url;
    } catch (error) {
        return error;
    }
}
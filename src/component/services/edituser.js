import { getDatabase, ref, update } from "firebase/database";


export const updateData = async (data, id,nameNodo) => {
    try {
        const realtime = getDatabase();
        const referencia = ref(realtime, nameNodo + id);
        await update(referencia, data);
        return true;
    }catch(error){
        return error;
    }
}
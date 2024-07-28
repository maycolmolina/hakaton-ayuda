
import { get, query, ref, equalTo, getDatabase, orderByChild } from "firebase/database";

export const ExistEmail= async (usuario) => {
    try {
        const realtime = getDatabase();
        const referencia = ref(realtime, 'usuarios');
        const consulta = query(referencia, orderByChild('email'), equalTo(usuario.email));

        const dataSnapshot = await get(consulta);

        if (!dataSnapshot.exists()) {
            throw new Error('found');
        }
        
        return dataSnapshot;
        
    } catch (error) {
        return false;
    }
};
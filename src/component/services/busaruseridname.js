import { ref, getDatabase, query, orderByChild, endAt, startAt, get } from "firebase/database";




export async function getUsuarios (nameorid, methodsearch) {
    try {
        const realtime = getDatabase();
        const nombreMinusculas = nameorid;
        const referencia = ref(realtime, 'usuarios')
        const consulta = query(referencia, orderByChild(methodsearch), startAt(nombreMinusculas), endAt(nombreMinusculas + '\uf8ff'));
        let snapshot=await get(consulta)
        if (snapshot.exists()){
            const usuarios = [];
            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key;
                const usuario = childSnapshot.val();
                usuario.id = key;
                usuarios.push(usuario);
            });
            return usuarios;
        } else {
            return [];
        }
    }
    catch (e) {
        return e;
    }
}

import { get, query, ref, equalTo, getDatabase, orderByChild } from "firebase/database";
import { Alert } from "react-native";
import { saveData } from "./datastorage";

const repairData = async (data) => {
    try {
        let datagood = [];
        data.forEach((dato) => {
            const key = dato.key;
            let datolisto = dato.val();
            datolisto.id = key;
            datagood.push(datolisto);
        });
        return datagood;
    } catch (error) {
        throw new Error('Error procesando datos: ' + error);
    }
};

// Función para buscar usuario en Firebase
const buscarUser = async (usuario) => {
    try {
        const realtime = getDatabase();
        const referencia = ref(realtime, 'usuarios');
        const consulta = query(referencia, orderByChild('email'), equalTo(usuario.email));

        const dataSnapshot = await get(consulta);
        if (!dataSnapshot.exists()) {
            throw new Error('No se encontro nigun correo asociado');
        }

        const users = await repairData(dataSnapshot);
        const user = users.find(user => user.password === usuario.password);

        if (user) {
            await saveData('user', JSON.stringify(user));
            Alert.alert('SALUDOS','bienvenido '+ user.nombre);
            return true;
        } else {
            Alert.alert('Usuario no encontrado,verifica tu cotraseña');
            return false;
        }
    } catch (error) {
        Alert.alert('Error', error.message || 'Ha ocurrido un error, verifica tu conexión');
        return false;
    }
};

export default buscarUser;

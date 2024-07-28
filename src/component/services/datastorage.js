import AsyncStorage from '@react-native-async-storage/async-storage';



export const saveData = async (key, valu) => {
    try {
        await AsyncStorage.setItem(key, valu);
        return true;
    } catch (error) {
        console.log('Error al guardar datos:', error);
        return false;
    }
}; 

export const getData = async (recuperardato) => {
    try {
        const value = await AsyncStorage.getItem(recuperardato);
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (error) {
        console.log('Error al obtener datos:', error);
        return null;
    }
};
export const removeData = async () => {

    AsyncStorage.removeItem('user')
    try {
        await AsyncStorage.removeItem('user');
        return true;
    } catch (error) {
        return false;
    }
};
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Platform, Alert } from 'react-native';
import Buttomgradient from '../misetiquetas/Buttongradient';
import theme from '../../theme';
import { getData, saveData } from '../services/datastorage';
import * as ImagePicker from 'expo-image-picker';
import { updateData } from '../services/edituser';
import { setstorage } from '../services/cambiar.img';
import {Loadingicon} from '../../icons/iconsEscalables';
import NetInfo from '@react-native-community/netinfo';

const CambiarImg = () => {
    const [user, setusert] = useState({})
    const [imageUri, setImageUri] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        getData('user').then((data) => {
            setusert(JSON.parse(data))
            setImageUri(JSON.parse(data).urlimg);
        });
        (async () => {
            if (Platform.OS != 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('permiso no consedido', 'Lo sentimos, necesitamos permisos para acceder a tu galería de fotos.');
                }
            }
        })()
    }, [])
    const updateimage = async () => {
        try {
            if (!image) {
                Alert.alert('Error', 'Debes seleccionar una imagen diferente en seleccionar');
                return;
            }
            let netifo = await NetInfo.fetch()
            if (!netifo.isInternetReachable) {
                throw new Error('no tienes acceso a internet')
            }

            setLoading(true);
            let p = await setstorage('imgPerfil/',user.id,image)
            const data = {
                apellidos: user.apellidos,
                nombre: user.nombre,
                email: user.email,
                password: user.password,
                sexo: user.sexo,
                telefono: user.telefono,
                urlimg: p
            }
            await updateData(data, user.id, 'usuarios/');
            data.id=user.id;
            await saveData('user', JSON.stringify(data));
            Alert.alert('exito','imagen actualizada');
            setLoading(false);
        } catch (error) {
            Alert.alert('' + error.message);
            setLoading(false);
        }
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.8,
        })
        if (!result.cancelled) {
            await setImageUri(result.assets[0].uri);
            const cambio=user;
            cambio.urlimg=result.assets[0].uri;
            setusert(cambio);
            let p = await fetch(result.assets[0].uri);
            const image = await p.blob();
            setImage(image);
        }
    };
    return (

        <View style={styles.container}>
            <View style={styles.principal}>
                <View>
                    <Text style={styles.titulo}>cambiar imagen de perfil</Text>
                    <Text style={styles.userdata}>usuario: {user.nombre + '  ' + user.apellidos}</Text>
                    <Text >{user.email}</Text>
                </View>
                {(user.urlimg === undefined || user.urlimg === '') && user.sexo === 'Mujer' && <Image
                    style={styles.imagen}
                    source={require('./perfilmujer.png')}>
                </Image>}
                {(user.urlimg === undefined || user.urlimg === '') && user.sexo === 'Hombre' && <Image
                    style={styles.imagen}
                    source={require('./perfilhonbre.png')}>
                </Image>}
                {user.urlimg !== undefined && user.urlimg != '' && <Image
                    style={styles.imagen}
                    source={{ uri: imageUri }}
                />}
                <View style={styles.funciones}>
                    <Buttomgradient onPress={pickImage} color='white' arrycolor={['#38b', '#236']}>seleccionar</Buttomgradient>
                    <Buttomgradient onPress={updateimage} color='white' arrycolor={['#38b', '#236']}>cambiar</Buttomgradient>
                </View>
                {loading &&<View style={styles.espera}>
                    <Text style={styles.cargatext}>actualizando perfil</Text>
                    <Loadingicon fill='#fff' width='200px' height='200px'></Loadingicon>
                </View>}
            </View>
        </View>
    )
}
export default CambiarImg

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cargatext:{
        fontSize:40,
        fontWeight: 'bold',
        color:'#fff',
        textAlign:'center'
    },
    espera: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    principal: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomRightRadius: 400,
        backgroundColor: theme.colors.textPrimary,
    },
    imagen: {
        width: 330,
        height: 330,
        borderRadius: 1000,
    },
    funciones: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    titulo: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold'
    },
    userdata: {
        marginTop: 15,
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold'
    }
})
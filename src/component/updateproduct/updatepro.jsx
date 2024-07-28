import React, { useState, useEffect } from 'react'
import { Alert, Platform } from 'react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Inputt from '../misetiquetas/inputper'
import theme from '../../theme';
import RNPickerSelect from "react-native-picker-select";
import Buttomgradient from '../misetiquetas/Buttongradient';
import * as ImagePicker from 'expo-image-picker';
import { Addicons } from '../../icons/iconsEscalables'
import { } from '@react-native-async-storage/async-storage'
import { getData } from '../services/datastorage';
import { setstorage } from '../services/cambiar.img';
import enviourl from '../services/insertrealtimedatabase'
import NetInfo from '@react-native-community/netinfo';
import { Loadingicon } from '../../icons/iconsEscalables';

const Updatepro = () => {
    const [moneda, setmoneda] = useState('$');
    const [categoria, setCategoria] = useState(undefined);
    const [precio, setprecio] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Nombre, setNombre] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [image, setImage] = useState(null);
    const [iduser, setiduser] = useState(null);
    // useState para controlar si esta cargando o no
    const [loading, setloading] = useState(false);
    // useState para controlar errores
    const [errorname, seterrorname] = useState(null);
    const [errordescripcion, seterrordescripcion] = useState(null);
    const [errorcategoria, seterrorcategoria] = useState(null);
    const [errorprecio, seterrorprecio] = useState(null);
    const [errorfoto, seterrorfoto] = useState(null);
    const [errormoneda, seterrormoneda] = useState(null);


    useEffect(() => {
        (async () => {
            if (Platform.OS != 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('permiso no consedido', 'Lo sentimos, necesitamos permisos para acceder a tu galería de fotos.');
                }
            }
        })();
        (async () => {
            let id = await getData('user');
            id = await JSON.parse(id).id;
            setiduser(id);
        })()
    }, [])
    //funciones de cambio
    const cambiarCategoria = (value) => {
        if (value === undefined) {
            seterrorcategoria('seleccione una categoria');
        } else {
            seterrorcategoria(null);
        }
        setCategoria(value);
    }
    const cambiarnameite = (value) => {
        if (value === undefined) {
            seterrormoneda('seleccione una categoria');
        } else {
            seterrormoneda(null);
        }
        setmoneda(value);
    }
    const cambiarnombre = (value) => {
        setNombre(value);
        if (value !== '') {
            seterrorname('');
        }

    }
    const cambiarprecio = (value) => {
        setprecio(value);
        if (value !== '') {
            seterrorprecio('');
        }
        if (/^\d+(\.\d+)?$/.test(value)) {
            seterrorprecio('');
        }
    }
    const cambiarDescripcion = (value) => {
        setDescripcion(value);
        if (value !== '') {
            seterrordescripcion('');
        }
    }
    //funcion de envio busquede de errores y limpieza
    function limpiar(){
        setNombre('');
        setDescripcion('');
        setmoneda('$');
        setCategoria(undefined);
        setprecio('');
        setDescripcion('');
        setImageUri(null);
        setImage(null);
        seterrorname(null);
        seterrordescripcion(null);
        seterrorcategoria(null);
        seterrorprecio(null);
        seterrorfoto(null);
        seterrormoneda(null);
    }
    async function buscarErrores() {
        let error = false;
        //errores de nombre
        if (Nombre == '') {
            seterrorname('el nombre no puede estas vacio');
            error = true;
        }
        if (precio == '') {
            seterrorprecio('inserte el precio del producto');
            error = true;
        }
        else if (!/^\d+(\.\d+)?$/.test(precio)) {
            seterrorprecio('ese no es un precio valido');
            error = true;
        }
        if (Descripcion == '') {
            seterrordescripcion('ingrese la descripcion');
            error = true;
        }
        if (moneda == undefined) {
            seterrormoneda('debe de seleccionar una moneda');
            error = true;
        }
        if (categoria == undefined) {
            seterrorcategoria('seleccione una categoria');
            error = true;
        }
        if (image === null) {
            seterrorfoto('debes de asignar una imagen al producto');
            error = true;
        }

        return error;
    }
    //funcion de envio
    async function enviar() {

        let error = await buscarErrores();
        if (error) {
            return;
        }
        try {
            setloading(true);
            let netifo = await NetInfo.fetch()
            if (!netifo.isInternetReachable) {
                throw new Error('no tienes acceso a internet');
            }

            let producto = {
                Nombre: Nombre,
                Descripcion: Descripcion,
                precio: precio,
                moneda: moneda,
                categoria: categoria,
                urlImg: '',
                id_propietario: iduser
            };
            if (image) {
                let p = await setstorage('imgProducto/', iduser + producto.Nombre, image)
                producto.urlImg = p;
                await enviourl('https://portal-de-ventas-47970-default-rtdb.firebaseio.com/productosventa.json', producto)
                Alert.alert('exito', 'producto agregado con exito');
                limpiar();
            }
        } catch (error) {
            Alert.alert(error.message);

        }finally{setloading(false);}

    }
    //funcion para seleccionar imagen
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.8,
        })
        if (!result.cancelled) {
            await setImageUri(result.assets[0].uri);
            let imgcomplet = await fetch(result.assets[0].uri);
            const image = await imgcomplet.blob();
            setImage(image);
            seterrorfoto(null);
        }
    };

    return (
        <View style={{ flex: 1 }} >


            <ScrollView>
                <Text style={styles.titulo}>agrega el nuevo producto</Text>
                <Inputt error={errorname} onChangeText={value => { cambiarnombre(value) }} value={Nombre} name='Nombre'></Inputt>
                <RNPickerSelect
                    onValueChange={(value) => { cambiarCategoria(value) }}
                    placeholder={{
                        label: 'categoria',
                    }}
                    items={[
                        { label: "Electronica", value: "electronica" },
                        { label: "prenda", value: "prenda" },
                        { label: "Hogar", value: "hogar" },
                        { label: "Alimentos y Bebidas", value: "alimentos_bebidas" },
                        { label: "Salud y Belleza", value: "salud_belleza" },
                        { label: "Deportes y Aire Libre", value: "deportes_aire_libre" },
                        { label: "Juguetes y Juegos", value: "juguetes_juegos" },
                        { label: "Libros y Medios", value: "libros_medios" },
                        { label: "Automotriz", value: "automotriz" },
                        { label: "Herramientas", value: "herramientas" },
                    ]}
                    value={categoria}
                />
                {errorcategoria && <Text style={styles.errors}> {errorcategoria} </Text>}
                <Inputt error={errordescripcion} onChangeText={value => cambiarDescripcion(value)} value={Descripcion} name='Descripcion'></Inputt>
                <Inputt error={errorprecio} onChangeText={value => { cambiarprecio(value) }} value={precio} name='precio'></Inputt>
                <RNPickerSelect
                    onValueChange={(value) => { cambiarnameite(value) }}
                    placeholder={{
                        label: 'moneda',
                    }}
                    items={[
                        { label: "dolar", value: "$" },
                        { label: "cordoba", value: "C$" },
                        { label: "euro", value: "€" },
                    ]}
                    value={moneda}

                />
                {errormoneda && <Text style={styles.errors}> {errormoneda} </Text>}
                <View style={styles.contimagen} >
                    <TouchableOpacity onPress={pickImage}>
                        <View style={styles.onpress} >
                            {imageUri &&
                                <Image
                                    style={styles.imagen}
                                    source={{ uri: imageUri }}
                                />
                            }
                            {!imageUri &&
                                <View style={styles.imagen} >
                                    <Addicons></Addicons>
                                </View>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                {errorfoto && <Text style={styles.errors}> {errorfoto} </Text>}
                <Buttomgradient onPress={enviar} arrycolor={[theme.colors.textPrimary, '#908']}> vender</Buttomgradient>
            </ScrollView>
            {loading && <View style={styles.espera}>
                <Text style={styles.cargatext}>publicando tu producto</Text>
                <Loadingicon fill='#fff' width='200px' height='200px'></Loadingicon>
            </View>}
        </View>
    )
};
export default Updatepro

const styles = StyleSheet.create({
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: theme.colors.textPrimary
    },
    cargatext: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
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
    onpress: {
        borderWidth: 1
    },
    imagen: {
        width: 200,
        height: 200,
    },
    contimagen: {
        marginVertical: 8,
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errors: {
        marginHorizontal: 10,
        color: theme.colors.red
    }
})
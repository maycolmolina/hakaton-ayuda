import React from 'react'
import { StyleSheet, Image, View, ScrollView } from 'react-native'
import UseFecht from '../services/useFecht';
import Estilostexto from '../styleText';
import Descripcionusu from '../descripcionesobjeto/descripciouser';
import Buttomgradient from '../misetiquetas/Buttongradient';
import { getData } from '../services/datastorage';
import { useNavigate } from 'react-router-native';

const Productvent = () => { 
    getData('user').then((data) => {
        if(data==null){
            ruta('/login')
        }
    })
    let ruta=useNavigate();
    const { error,data, loading,  handlecancelrequest,refresh } = UseFecht('https://portal-de-ventas-47970-default-rtdb.firebaseio.com/productosventa.json');
    
    let productos
    if (data !== undefined && data !== null && data.length !==0) {
        productos= Object.values(data)
        productos.forEach((pro,index)=> {
            pro.id=Object.keys(data)[index];
        })
        productos = productos.reverse();
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                {loading && <View>
                    <Estilostexto style={styles.title} fontWeight='bold'>cargando...</Estilostexto>
                    <Buttomgradient  arrycolor={['#235f6e','gray']} onPress={handlecancelrequest} >cancelar</Buttomgradient>
                </View>}
                {productos?.map((pro) => (
                    <View style={styles.card} key={pro.id} >
                        <View style={[styles.imgcontainer]}>
                            <Image
                                style={styles.IMG}
                                source={{
                                    uri: pro.urlImg,
                                }}
                            />
                        </View>
                        <Descripcionusu {...pro} />
                    </View>
                ))}
                {error && <View>
                    <Estilostexto style={styles.m} error >{error.message}</Estilostexto>
                    <Buttomgradient arrycolor={['#235f6e','gray']} onPress={refresh}>reintentar</Buttomgradient>
                </View>}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical:20,
        borderBottomColor:'black',
        borderBottomWidth: 1,
        borderBottomStyle:'solid',
        padding:5,
    },
    IMG: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        backgroundColor:'white',
        borderRadius:5

    },
    imgcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        borderBlockColor: 'rgba(255, 255, 255,)',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10
    }
    , m: {
        marginBottom: 10,
        marginTop: 20
        ,textAlign: 'center'
    }
})
export default Productvent;


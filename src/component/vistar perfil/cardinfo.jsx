import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Emailicons, Closeicon, Whatsappicon } from '../../icons/iconsEscalables'
import theme from '../../theme';
import { whatsappredirecto } from '../services/urlRdeict';

const Infocard = ({ producto, funcion ,numberofcontact}) => {
    const number=numberofcontact;
    function sendmessage() {
        whatsappredirecto(number, 'estoy interesado en tu '+producto.Nombre );
    }
    return (
        <View style={styles.cardinfo}>
            <View style={styles.principalcard}>
                <View style={styles.closei}>
                    <TouchableOpacity onPress={funcion}>
                        <Closeicon></Closeicon>
                    </TouchableOpacity>
                </View>
                <View style={styles.categocard}>
                    <Text style={styles.texcat}>{producto.categoria}</Text>
                </View>
                <Image
                    source={{ uri: producto.urlImg}}
                    style={styles.imagencard}
                />
                <Text style={[styles.colortext, styles.name]}>{producto.Nombre}</Text>
                <Text style={[styles.preciocard, styles.colortext, styles.name]}>{producto.moneda+'  '+producto.precio}</Text>
                <View style={styles.carddescriptions}>
                    <Text style={[{ fontSize: 10 }, styles.colortext]}>{producto.Descripcion}</Text>
                </View>
                <View style={styles.funcard}>
                    <TouchableOpacity onPress={sendmessage}>
                        <View style={styles.realizarcompra}>
                            <Text style={[styles.colortext, styles.name]}>pedir</Text>
                            <Whatsappicon width='20px' height='20px'></Whatsappicon>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.realizarcompra}>
                            <Text style={[styles.colortext, styles.name]}>pedir</Text>
                            <Emailicons width='20px' height='20px'></Emailicons>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    realizarcompra: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#235f6e',
        paddingVertical: 10,
        borderWidth: 1,
        width: 100,
        justifyContent: 'space-around',
        borderColor: 'white'
    },
    funcard: {
        width: '100%',
        marginVertical: 10,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    colortext: {
        color: 'white'
    },

    closei: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: -15,
        right: -15
    },
    name: {
        fontSize: 20
    },
    categocard: {
        backgroundColor: 'yellow',
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        maxWidth: 150,
        borderRadius: 10
    },
    texcat: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    principalcard:
    {
        width: 300,
        marginHorizontal: 7,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-around',
        borderWidth: 0.6,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: theme.colors.textPrimary
    },
    preciocard: {
        fontWeight: 'bold',
    },
    carddescriptions: {
        padding: 5,
        borderWidth: 0.6,
        borderColor: '#ccc',
        alignItems: 'center',
        marginVertical: 3,
        width: 200,
    },
    imagencard: {
        width: 200,
        height: 200,
        borderWidth: 1

    },
    cardinfo: {
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.9,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Infocard;
import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import theme from '../../theme';
import Input from '../misetiquetas/myinputtext';
import { Searchusericon, Loadingicon } from '../../icons/iconsEscalables';
import RNPickerSelect from "react-native-picker-select";
import { getUsuarios } from '../services/busaruseridname';
import { Listuser } from '../lista de usuarios/Lituser';
import NetInfo from '@react-native-community/netinfo';
export const Buscar = () => {
    const [loading, setloading] = useState(false);
    const [nameorid, setnameorid] = useState('');
    const [nameitem, setnameitem] = useState('nombre');
    const [smserror, setsmserror] = useState('')
    const [usuarios, setusuarios] = useState([]);
    const [smsbusqueda, setsmsbusqueda] = useState('');

    const cambiarnameite = (val) => {
        setnameitem(val);
    }
    function cambiarname(val) {
        setnameorid(val);
    }
    async function hacerpeticion() {
        if (nameorid == '') { setsmserror('no tiene ningun campo de busqueda'); return }
        if (nameitem == null) { setsmserror('seleccione un metodo de busqueda'); return; }
        if (nameitem == 'nombre') {
            if (!/^(\s*\S\s*){3,}$/.test(nameorid)) { setsmserror('busqueda no explicita'); return; }
        } else {
            if (!/^-[^\\s]*$/.test(nameorid)) { setsmserror('los id deben de tener un guion al inicio'); return };
            if (!/^(\s*\S\s*){6,}$/.test(nameorid)) { setsmserror('el id a buscar debe de tener al menos 5 caracteres excluyendo el guion'); return; }
        }
        try {
            let netifo = await NetInfo.fetch()
            if (!netifo.isInternetReachable) {
                setsmsbusqueda('no tienes acceso ha internet');
                return;
            }
            setloading(true);
            let usu = await getUsuarios(nameorid, nameitem);
            setusuarios(usu);
            if (usu.length === 0) {
                setsmsbusqueda('no se encontro ningun usuario');
            } else {
                setsmsbusqueda('');
            }
            
        } catch (e) {
            setsmsbusqueda(e.message);
        } finally {
            setloading(false);
            setsmserror('');
        }

    }
    return (
        <View style={styles.complet}>
            <View style={styles.principal}>
                <View style={styles.cajabuscar}>
                    <Input value={nameorid} onChangeText={cambiarname} placeholder='busqueda' style={styles.input}></Input>
                    <TouchableOpacity onPress={hacerpeticion}>
                        <View style={styles.iconobuscar}>
                            <Searchusericon ></Searchusericon>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.smserror}>{smserror}</Text>
                <RNPickerSelect
                    onValueChange={(value) => { cambiarnameite(value) }}
                    placeholder={{
                        label: 'seleccione el metodo',
                    }}
                    items={[
                        { label: "por id", value: "id" },
                        { label: "por nombre", value: "nombre" },
                    ]}
                    value={nameitem}
                />
            </View>
            <View style={styles.resut}>
                <ScrollView>
                    {!loading && <Text style={styles.smsbusqueda}>{smsbusqueda}</Text>}
                    {usuarios.map(usu => {
                        return (
                            <Listuser user={usu} ></Listuser>
                        )
                    })}
                   {loading && <View style={styles.carga}>
                        <View style={{ width: 100, height: 100 }}>
                            <Loadingicon></Loadingicon>
                        </View>
                    </View>}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    complet: {
        flex: 1,
        backgroundColor: theme.colors.textPrimary,
    },
    principal: {
        alignItems: 'center',
        padding: 20,
    },
    smsbusqueda: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 20,
        marginHorizontal: 20,
        padding: 5,
    },
    cajabuscar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        borderRadius: 30,
        overflow: 'hidden',
    },
    iconobuscar: {
        width: 50,
        height: 50,
        backgroundColor: '#765',
        padding: 5
    },
    input: {
        marginVertical: 0,
        width: 250,
        height: 50,
        borderRadius: 0
    },
    resut: {
        height: 300,
        marginHorizontal: 20,
        padding: 5,
    },
    smserror: {
        color: '#db4040',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },carga: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    }
});

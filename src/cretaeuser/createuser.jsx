import React from 'react'
import { View, StyleSheet, Alert, ScrollView } from 'react-native'
import { Formik } from 'formik';
import Formikinput from '../component/misetiquetas/ImputifErrir';
import { createuserValidacion } from '../component/validacionesyap/validacionschemas';
import enviourl from '../component/services/insertrealtimedatabase';
import { useState } from 'react';
import Estilostexto from '../component/styleText';
import { useNavigate } from 'react-router-native';
import RNPickerSelect from "react-native-picker-select";
import Buttomgradient from '../component/misetiquetas/Buttongradient';
import _ from 'lodash';
import { ExistEmail } from '../component/services/verificarcorreo';
import { saveData } from '../component/services/datastorage';
import NetInfo from '@react-native-community/netinfo';

const user = {
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    password2: '',
    sexo: '',
    telefono: '',
    pais: '',
}



const Createuser = () => {
    const [loading, setLoading] = useState(false);
    const ruta = useNavigate()
    const crear = async (usuario) => {
        try {
            setLoading(true);
            let netifo = await NetInfo.fetch()
            if (!netifo.isInternetReachable) {
                throw new Error('no tienes acceso a internet')
            }
            let correex = await ExistEmail(usuario)
            if (correex!=false) {
                throw new Error('el correo que estas intentando utilizar ya esta asociado a una cuenta');
            }
            let user = {
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                email: usuario.email,
                password: usuario.password,
                sexo: usuario.sexo,
                telefono: usuario.pais + usuario.telefono,
            }
            let urlapi = 'https://portal-de-ventas-47970-default-rtdb.firebaseio.com/usuarios.json';

            let res = await enviourl(urlapi, user)
            if (!res.ok) {
                throw new Error('a ocurrido un error al crear')
            }
            let usercreate= await ExistEmail(user);
            if(usercreate==false){
                throw new Error('a ocurrido un error al guardar datos de secion, posiblemente tu cuenta ya esta creada ve a login y verifica tu cuenta')
            }
            let userListo;
            usercreate.forEach((user) => {
                const key = user.key;
                userListo = user.val();
                userListo.id = key;
            })
            const resf=await saveData('user',JSON.stringify(userListo))
            if (resf==false) {
                throw new Error('a ocurrido un error ,posiblemente tu cuenta ya esta creada ve a login y verifica tu cuenta')
            }
            ruta('/');
            setLoading(false);
        } catch (error) {
            Alert.alert(''+error.message);
            setLoading(false);
        }
    }
    return (
        <Formik  validationSchema={createuserValidacion} initialValues={user} onSubmit={values => { crear(values) }}>
            {
                ({ handleSubmit, handleChange, values, errors }) => {
                    return (
                        <ScrollView>
                            <View style={styles.vistaformularios}>
                                <View style={styles.form}>
                                    <Estilostexto fontWeight='bold' style={{ color: '#000', fontSize: 25 }}>registro de usuario</Estilostexto>
                                    <Formikinput
                                        style={styles.inputsty}
                                        name='nombre'
                                        placeholder='Nombre'
                                        placeholderTextColor="black"
                                    />
                                    <Formikinput
                                        style={styles.inputsty}
                                        name='apellidos'
                                        placeholder='Apellidos'
                                        placeholderTextColor="black"
                                    />
                                    <Formikinput
                                        style={styles.inputsty}
                                        name='email'
                                        placeholder='E-mail'
                                        placeholderTextColor="black"
                                    />
                                    <Formikinput
                                        style={styles.inputsty}
                                        name='password'
                                        placeholder='Password'
                                        secureTextEntry
                                        placeholderTextColor="black"
                                    />
                                    <Formikinput
                                        style={styles.inputsty}
                                        name='password2'
                                        placeholder='repeat Password'
                                        secureTextEntry
                                        placeholderTextColor="black"
                                    />
                                    < >
                                        <RNPickerSelect
                                            onValueChange={handleChange('pais')}
                                            placeholder={{
                                                label: 'pais para su numero de telefono',
                                                value: '',
                                            }}
                                            items={[
                                                { label: "Nicaragua ", value: "+505" },
                                                { label: "costarica", value: "+506" },
                                            ]}
                                            value={values.pais}
                                        />
                                        {errors && <Estilostexto error >{errors.pais}</Estilostexto>}
                                    </>
                                    <Formikinput
                                        style={styles.inputsty}
                                        name='telefono'
                                        placeholder='telefono'
                                        placeholderTextColor='black'
                                    />
                                    <>
                                        <RNPickerSelect
                                            onValueChange={handleChange('sexo')}
                                            placeholder={{
                                                label: 'genero o sexo',
                                                value: '',
                                            }}
                                            items={[
                                                { label: "Hombre", value: "Hombre" },
                                                { label: "Mujer", value: "Mujer" },
                                            ]}
                                            value={values.sexo}
                                        />
                                        {errors && <Estilostexto error>{errors.sexo}</Estilostexto>}
                                    </>

                                    {loading && <Estilostexto style={{ fontSize: 30 }} fontWeight='bold' color='secundary'>creando usuario...</Estilostexto>}
                                    {!loading && <Buttomgradient arrycolor={['#38b', '#236']} color='white' onPress={handleSubmit}>INICIAR</Buttomgradient>}
                                </View>
                            </View>
                        </ScrollView>
                    )
                }
            }
        </Formik>
    );
};



export default Createuser


_
const styles = StyleSheet.create({
    inputsty: {
        color: 'black',
        borderColor: 'white',
        backgroundColor: 'white',
        borderBottomWidth: 0,
        padding: 13,
        borderRadius: 30,
        paddingStart: 40,
        height: 60
    },
    vistaformularios: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#236'
    },
    form: {
        justifyContent: 'space-around',
        width: '100%',
        padding: 20,
        borderRadius: 5,
    }
});
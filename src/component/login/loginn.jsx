import React, { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Formik } from 'formik'//pra usa esto se debe de instalar npm install formik
import Input from '../misetiquetas/myinputtext.jsx'
import Estilostexto from '../styleText.jsx'
import {logvalidateschema} from '../validacionesyap/validacionschemas.jsx'
import Formikinput from '../misetiquetas/ImputifErrir.jsx'
import Buttomgradient from '../misetiquetas/Buttongradient.js'
import { useNavigate } from 'react-router-native'
import buscaruser from '../services/busquedas.js'
import { useState } from 'react'

const inicialValues = {
    email: '',
    password: ''
}
// const Formikinput = ({ name, ...props }) => {

//     const [field, meta, helper] = useField(name)
//     return (
//         <>
//             <Input
//                 error={meta.error}
//                 value={field.value}
//                 onChangeText={value => helper.setValue(value)}
//                 {...props}
//             />
//             {meta.error &&
//                 <Estilostexto style={styles.error}  > {meta.error} </Estilostexto>
//             }

//         </>

//     )
// }


const Login = () => {//buscar explicacion mas profunda
    const [buttonactive,setbutonactive]=useState(true);
    const ruta=useNavigate()
    const ir=()=> {
        ruta('/createuser')
    };
    function finduser(values) {
        setbutonactive(false);
        buscaruser(values).then((user)=>{
            if(user){
                setbutonactive(true);
                ruta('/')
            }else{
                setbutonactive(true);
            }
        });
    }
    return (
        <Formik  validationSchema={logvalidateschema}  initialValues={inicialValues} onSubmit={values => { finduser(values) }} >
            {
                ({ handleChange, handleSubmit, values,errors }) => {
                    return (
                        <View style={[{ flex: 1 }, styles.vistaform]}>
                            <View style={styles.form}>
                                <Estilostexto fontWeight='bold' style={{ color: '#000', fontSize: 60 }}>Inicia!</Estilostexto>
                                <Formikinput
                                    style={styles.inputsty}
                                    placeholder='E-mail'
                                    name='email'
                                />
                                {/* //esto es otra forma de hacer esto */}
                                <>
                                    <Input
                                        style={styles.inputsty}
                                        error={errors.password}
                                        placeholder='password'
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        secureTextEntry
                                    />
                                    {errors.password &&
                                        <Estilostexto error > {errors.password} </Estilostexto>
                                    }
                                </>
                                { <TouchableOpacity onPress={ir}>
                                    <Estilostexto  style={styles.mens}>no tienes cuenta?</Estilostexto>
                                </TouchableOpacity>
                            }
                               {buttonactive && <Buttomgradient  color='white' arrycolor={['#38b','#236']} onPress={handleSubmit}>log in</Buttomgradient>}                              
                               {!buttonactive && <Estilostexto  style={styles.mens}>verificando usuarios ,si el proceso es lento verifica tu conexion, o reinicia tu aplicacion</Estilostexto>}
                            </View>
                        </View>

                    )
                }
            }
        </Formik>
    )
}
// forma para hacer mis propias expepciones 
// const validacion = values => {
//     errors = {}
//     if (!values.email) {
//         errors.email = 'este campo es oligatorio'
//     } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
//         errors.email = 'este no es un email valido'
//     } else if (!values.password) {
//         errors.password = 'este campo es requerido'
//     } else if (!/^(?!\s)(?=.*[a-zA-Z0-9\s]).{4,}(?<!\s)$/.test(values.password)) {
//         errors.password = 'no debe de tener espacios al principio ni al final, minimo 4 caracteres'
//     }
//     console.log(errors)
//     return errors
// }






export default Login

const styles = StyleSheet.create({
    inputsty: {
        backgroundColor:'white', 
        borderBottomWidth:0,
        padding: 13,
        borderRadius: 30,
        paddingStart:40,
        height:60,
        color:'black',
    },
    mens: {
        paddingBottom: 30,
        textAlign: 'right',
    },
    vistaform: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    form: {
        justifyContent: 'space-around',
        width: '100%',
        margin: 10,
        padding: 20,
        borderRadius: 5,
    }
})


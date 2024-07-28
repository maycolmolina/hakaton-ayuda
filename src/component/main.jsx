import React from 'react'
import { View, StyleSheet, Platform } from "react-native";
import theme from '../theme';
import { NativeRouter, Routes, Route } from 'react-router-native';
import Login from './login/loginn.jsx';
import Productvent from './productvent/productvent.jsx';
import Createuser from '../cretaeuser/createuser.jsx';
import CurvedContainer from './perfil/perfil.jsx';
import Perfilview from './cambiarfoto/Acambiarphoto.perfil.jsx';
import { Buscar } from './busaquedas/busquedauser.jsx';
import VisitarP from './vistar perfil/VisitarPerfil.jsx';
import AddPro from './addproduct/addPro.jsx';


const Appbar = Platform.select({
    ios: () => require('./appbar.jsx').default,
    android: () => require('./androidappbar.jsx').default,
    default: () => require('./appbar.jsx').default
})()
const Main = () => {
    return (
        <NativeRouter>
            <View style={styles.container}>
                <Appbar />
                <Routes>
                    <Route path='/login' element={<Login />} exact />
                    <Route path='/' element={<Productvent />} exact />
                    <Route path='/createuser' element={<Createuser />} exact />
                    <Route path='/perfil' element={<CurvedContainer/>} exact />
                    <Route path='/cambiarfotoP' element={<Perfilview/>} exact />
                    <Route path='/searchuser' element={<Buscar/>} exact />
                    <Route path='/usuario/:iduser' element={<VisitarP/>} exact />
                    <Route path='addpro' element={<AddPro/>} exact />
                </Routes>
            </View>
        </NativeRouter>
    )
}




export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.generalbackground,
    },
    button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    titlee: {
        color: theme.colors.dark,
        fontWeight: theme.fontweighs.bold,
        fontSize: 22,
        textAlign: 'center',
        top: 'auto',
        fontFamily: 'sanf-serift',
        backgroundColor: theme.colors.primary,
        alignSelf: 'flex-start',
        borderRadius: 5,
        overflow: 'hidden',
        padding: 2
    },
    red: {
        color: 'red',
    },
});
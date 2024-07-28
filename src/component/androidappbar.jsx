import React from 'react'
import { useEffect,useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import Estilostexto from './styleText'
import Constants from 'expo-constants'
import theme from '../theme'
import { Link, useLocation, } from 'react-router-native'
import { getData, removeData, } from './services/datastorage'
import { useNavigate } from 'react-router-native'
import { Whatsappicon,Homeicons,Perfil,Logouticon,Visitaricons } from '../icons/iconsEscalables'

const icons={
    'whatsapp':Whatsappicon,
    'home':Homeicons,
    'perfil':Perfil,
    'logout':Logouticon,
    'visit':Visitaricons
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.textPrimary,
        paddingTop: Constants.statusBarHeight + 10,
        flexDirection: 'row',
    },
    text: {
        color: theme.colors.white
    },
    active: {
        color: 'white'
    }
    , inactive: {
        color: 'rgb(180, 182, 182)'
    }
    ,iconstab:{
        paddingVertical:5,
        paddingHorizontal:10,
        margin:3
    },
    activeicons:{
        borderBottomWidth:3,
        borderBottomColor:'white'
    }
    
})


const Appbartab = ({ children, to, style }) => {
    const { pathname } = useLocation()
    const active = pathname === to
    const estilos = [
        style,
        active == true && styles.active,
        active == false && styles.inactive
    ]
    return (
        <View style={style}>
            <Link to={to}>
                <Estilostexto style={estilos} fontWeight='bold' big>
                    {children}
                </Estilostexto>
            </Link>
        </View>

    )
}

const AppbartabIcon = ({ to, style,nameicon }) => {
    const { pathname } = useLocation()
    const active = pathname === to
    const Iconloas=icons[nameicon]
    const estilos = [
        style,
        styles.iconstab,
        active == true && styles.activeicons,
    ]
    return (
        <View style={estilos}>
            <Link to={to}>
               {Iconloas && <Iconloas width='30px' height='30px'></Iconloas>}
            </Link>
        </View>
    )
}

const Appbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const p=setInterval(verificar,500)
        return () => {
            clearInterval(p)
        }
    }, []);

    const verificar=() => {
        loginis().then(isLoggedIn => {
            setIsLoggedIn(isLoggedIn);
        }).catch(error => {
            console.error('Error al verificar el estado de inicio de sesión:', error);
        });
    };

    const ruta = useNavigate()

    function logout() {
        removeData().then(res => {
            if (res) {
                ruta('/login')
            }
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={{ padding: 10 }} >
                {!isLoggedIn && <Appbartab style={{ margin: 5 }} to='/login'>iniciar sesion</Appbartab>}
                {!isLoggedIn && <Appbartab style={{ margin: 5 }} to='/createuser'>empezar</Appbartab>}
                {isLoggedIn && <AppbartabIcon  to='/' nameicon='home'/>}
                {isLoggedIn && <AppbartabIcon  to='/perfil' nameicon='perfil'/>}
                {isLoggedIn && <AppbartabIcon  to='/searchuser' nameicon='visit'/>}
                {isLoggedIn && <TouchableOpacity onPress={logout} style={{ margin: 5 }} >
                    <Logouticon width='30px' height='30px'></Logouticon>
                </TouchableOpacity>}
            </ScrollView>
        </View>
    )
}
async function loginis() {
    try {
        const user = await getData('user');
        if (user === null) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error al verificar el estado de inicio de sesión:', error);
        return false; // Si hay un error, asumimos que el usuario no está autenticado
    }
}



export default Appbar
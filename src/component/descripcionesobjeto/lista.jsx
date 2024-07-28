import React from "react"
import { View, Image, StyleSheet } from "react-native"
import Descripcionusu from './descripciouser.jsx'

const Listas = (user) => {
    return (
        <View style={{flexDirection:'row',justifyContent:'center'}}>
            <View style={[misestilos.imgcontainer]}>
                <Image
                    style={misestilos.IMG}
                    source={{
                        uri: user.imagenUrl,
                    }}
                />
            </View>
            <Descripcionusu {...user} />
        </View>
    )

}
export default Listas

const misestilos = StyleSheet.create({
    imgcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    IMG: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        borderRadius:5
    }
})
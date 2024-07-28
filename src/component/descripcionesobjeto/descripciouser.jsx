import React from "react"
import { View, StyleSheet } from "react-native"
import Estilostexto from "../styleText"

const parsetthousands = value => {
    return value >= 1000
        ? `${Math.round(value / 1000)}k`
        : String(value);
}

const Descripcionusu = item => {
    return (
        <View style={[misestilos.card]} >
            <View  style={misestilos.flexadaptable}>
                <Estilostexto fontWeight='bold' big color='dark'>nombre: </Estilostexto>
                <Estilostexto fontSize='subheading' color='primary'>{item.Nombre}</Estilostexto>
            </View>
            <View style={misestilos.flexadaptable}>
                <Estilostexto fontWeight='bold' big color='secundary'>precio: </Estilostexto>
                <Estilostexto fontSize='subheading' color='primary'  >{parsetthousands(item.precio)+' '+item.moneda}</Estilostexto>
            </View>
            {item.Descripcion &&
                <View style={misestilos.flexadaptable}>
                <Estilostexto fontWeight='bold' big color='secundary'>Descripcion: </Estilostexto>
                <Estilostexto fontSize='subheading' color='primary'  >{item.Descripcion}</Estilostexto>
            </View>}
        </View>
    )
}

export default Descripcionusu

const misestilos = StyleSheet.create({
    card: {
        padding: 20,
        width:200,

    },
    flexadaptable:{
        
    }

})
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import theme from '../../theme'

const Input=({error,style,...props})=>{

    const inputstyle=[
        styles.textinput,
        error && styles.error,
        ,styles.inputsty,
        style,
    ]
    return(
        <TextInput  style={inputstyle} {...props}></TextInput>
    )
}



const styles=StyleSheet.create({
    textinput:{
        marginVertical: 20,
        borderColor: 'black',
        borderStyle: 'solid',
        borderBottomWidth: 1
    },
    error:{
        borderColor:theme.colors.red
    },
    inputsty: {
        backgroundColor:'white', 
        borderBottomWidth:0,
        padding: 13,
        borderRadius: 30,
        paddingStart:40,
        height:60,
        color:'black',
    },
})

export default Input
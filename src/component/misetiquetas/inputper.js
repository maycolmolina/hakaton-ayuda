import React from 'react'
import { StyleSheet, TextInput,View,Text} from 'react-native'
import theme from '../../theme'

const Inputt=({name,error,style,...props})=>{

    const inputstyle=[
        error && styles.error,
        styles.inputsty,
        style,
    ]
    return(
        <View>
            <Text style={styles.textinput}> {name}</Text>                
            <TextInput  style={inputstyle} {...props}></TextInput>
            {error &&
                <Text style={styles.error}> {error} </Text>
            }
        </View>
    )
}



const styles=StyleSheet.create({
    textinput:{
        marginHorizontal:10,
        fontSize:15
    },
    error:{
        color:theme.colors.red,
        marginHorizontal: 10,
    },
    inputsty: {
        backgroundColor:'#fff', 
        borderRadius: 8,
        color:theme.colors.textPrimary,
        marginVertical: 10,
        marginHorizontal: 10,
        borderColor: 'black',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical:10,
        paddingStart:8
    },
})

export default Inputt
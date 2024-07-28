import { StyleSheet, Text ,Platform} from 'react-native'
import theme from '../theme.js';


const styleText = StyleSheet.create({
    text: {
        fontSize: theme.fontsize.body,
        color: theme.colors.primary,
        fontFamily:theme.fonts.main,
        fontWeight:theme.fontweighs.normal
    },
    error:{
        color: theme.colors.red
    },
    
    bold: {
        fontWeight: theme.fontweighs.bold
    }
    ,
    blue: {
        color: theme.colors.primary
    }
    ,
    big: {
        fontSize: 20
    },
    small: {
        fontSize: 10
    },
    colorPrimary:{
        color:theme.colors.textPrimary,

    },
    colordark:{
        color:theme.colors.dark
    }
    ,
    secundaryColor:{
        color:Platform.select({
            android:theme.colors.dark,
            ios:theme.colors.activo,
            default:'black'
        })
    },
    subheading:{
        fontSize:theme.fontsize.subheading
    },
    danger:{
        color:theme.colors.red
    },
    textAlingcenter:{
        textAlign:'center'
    },
    white:{
        color:Platform.OS=='android' ?theme.colors.white:'blue'
    }
})

export default function Estilostexto({ error, align,small,big,children,color,fontSize,fontWeight,style,...restOfProps}){
    const textStiles=[
        styleText.text,
        color==='primary' && styleText.colorPrimary,
        align==='center' && styleText.textAlingcenter,
        color==='secundary' && styleText.secundaryColor,
        color==='dark' && styleText.colordark,
        color==='blue' && styleText.blue,
        color==='danger' && styleText.danger,
        color==='white' && styleText.white,
        fontSize==='subheading' && styleText.subheading,
        fontWeight==='bold' && styleText.bold,
        big && styleText.big,
        small && styleText.small,
        style,
        error && styleText.error
    ]
    return(
        <Text style={textStiles} {...restOfProps}>
            {children}
        </Text>
    )
}

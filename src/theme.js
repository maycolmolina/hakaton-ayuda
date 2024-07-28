import { Platform } from "react-native"


const theme={
    colors:{
        textPrimary:'#235f6e',
        textSecundary:'#909', 
        primary:'#000',
        red:'#FF001E',
        dark:'#000',
        generalbackground:'#8975',
        white:'rgb(255, 255, 255);',
        activo:'orange'
    },
    fontsize:{
        body:14,
        subheading:16
    },
    fonts:{
        main:Platform.select({
            android:'serif',
            ios:'Arial',
            default:'Times New Roman'
        })
    },
    fontweighs:{
        normal:'400',
        bold:'bold'
    }
}
export default theme
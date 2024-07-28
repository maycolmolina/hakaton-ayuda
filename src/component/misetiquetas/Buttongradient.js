import { TouchableOpacity, Text ,StyleSheet} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
let colortext='black';

const Buttomgradient = ({arrycolor,children,color,onPress}) => {
    
    const buttonstyles = [
        styles.buttomgradient
    ]
    const textyle=[
        styles.buttontext,
        color==='white' && styles.colorwhite,
        color==='black' && styles.colorblack
    ]
    return (
        <TouchableOpacity  onPress={onPress} >
            <LinearGradient style={buttonstyles} colors={arrycolor}
            start={{x:0,y:1}}
            end={{x:1,y:1}}
            >
                <Text style={textyle}>
                    {children}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};



export default Buttomgradient;

const styles = StyleSheet.create({
    buttomgradient:{
        alignSelf:'center',
        borderRadius:25,
    },
    buttontext:{
        textAlign:'center',
        alignSelf:'center',
        fontSize:20,
        paddingHorizontal:40
        ,paddingVertical:10,
        fontWeight:'bold',
        color:colortext
    },
    colorwhite:{
        color:'white'
    }
    ,colorblack:{
        color:'black'
    }
    ,colortetxpersonalizado:{
        color:colortext
    }
})
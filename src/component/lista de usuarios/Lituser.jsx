import { View, Text, StyleSheet, Image ,Button} from 'react-native';
import { useNavigate} from 'react-router-native'

export const Listuser = ({ user }) => {
    const id=user.id;
    const rutas=useNavigate()
    function visitar(){
        rutas('../usuario/'+id)
    }
    return (
        <View style={styles.container} >
            {(user.urlimg === undefined || user.urlimg === '') && user.sexo === 'Hombre' && <Image
                source={require('../../../assets/perfilhonbre.png')}
                style={styles.IMG}
            />}
            {(user.urlimg === undefined || user.urlimg === '') && user.sexo === 'Mujer' && <Image
                source={require('../../../assets/perfilmujer.png')}
                style={styles.IMG}
            />}
            {
                user.urlimg != undefined && user.urlimg != '' && <Image
                    source={{ uri: user.urlimg }}
                    style={styles.IMG}
                />
            }
            <View style={styles.info}>
                <Text style={styles.info}>{user.nombre}</Text>
                <Text >{user.email}</Text>
            </View>
            <Button title='ir' onPress={visitar} color={'#765'}  ></Button>
        </View>
    )
};

const styles = StyleSheet.create({
    IMG: {
        width: 60,
        height: 60,
        borderRadius: 50,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    info:{
        color: 'white',
    },
    container: {
        flexDirection:'row',
        justifyContent:'space-around'
        ,alignItems:'center'
    }
});
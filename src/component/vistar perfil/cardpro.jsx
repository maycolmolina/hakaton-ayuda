import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import Buttomgradient from '../misetiquetas/Buttongradient';

const Cardcomponent = ({onpress ,pro,nameboton}) => {
    return (
      <View style={styles.principalcard}>
        <Image
          source={{ uri: pro.urlImg}}
          style={styles.imagencard}
        />
        <Text>{pro.Nombre}</Text>
        <Text style={styles.preciocard}>{pro.moneda+' '+pro.precio}</Text>
        <View style={styles.carddescriptions}>
          <Text style={{ fontSize: 10 }}> {pro.Descripcion}</Text>
        </View>
        <Buttomgradient  onPress={onpress} color='white'  arrycolor={['#235f6e', 'gray']} title='comprar'>{nameboton}</Buttomgradient>
      </View>
    );
  }

  const styles = StyleSheet.create({
    principalcard:
    {
      width: 140,
      marginHorizontal: 7,
      alignItems: 'center',
      padding:10,
      justifyContent: 'space-around',
      borderWidth: 0.6,
      borderColor: '#ccc',
      borderRadius:10,
    },
    preciocard: {
      fontWeight: 'bold',
    },
    carddescriptions: {
      padding: 5, 
      borderWidth: 0.6,
      borderColor: '#ccc',
      alignItems: 'center',
      marginVertical: 3,
      width: '100%',
    },
    imagencard: {
      width: 120,
      height: 120,
      borderWidth: 1
  
    },
})

export default Cardcomponent;
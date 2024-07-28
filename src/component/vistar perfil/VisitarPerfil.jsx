import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Erroricon, Whatsappicon, Addfriendicon, Oflike, Onlike, Pencilicons, Followersicons, Loadingicon } from '../../icons/iconsEscalables'
import theme from '../../theme';
import { whatsappredirecto } from '../services/urlRdeict';
import { useParams } from 'react-router-native'
import UseFecht from '../services/useFecht';
import Estilostexto from '../styleText';
import Buttomgradient from '../misetiquetas/Buttongradient';
import Cardcomponent from './cardpro';
import getproducct from '../services/busarpordeusuario';
import Infocard from './cardinfo';
 

const VisitarP = () => {
  const [pro, setpro] = useState([])
  const [proinfo, setproinfo] = useState(null)
  const { iduser } = useParams();
  let user = {}
  const { data, loading, error, handlecancelrequest, refresh } = UseFecht('https://portal-de-ventas-47970-default-rtdb.firebaseio.com/usuarios/' + iduser + '.json');
  if (data) {
    user = data;
  }
  useEffect(() => {
    (async () => {
      let id = iduser;
      let datos = await getproducct(id, 'id_propietario');
      setpro(datos);

    }
    )()
  }, [])
  function sendmessage() {
    whatsappredirecto(user.telefono, '')
  }
  function ver(value){
    let x=pro.find(producto=>producto.id===value);
    setproinfo(x);
  }
  function cerrar(){
    setproinfo(null);
  }
  return (

    <View style={styles.container}>
      {!loading && !error && <View style={styles.principal}>
        <View style={styles.contdatos}>
          <View>
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
            <TouchableOpacity >
              <View style={styles.like}>
                <Oflike></Oflike>
                <Text style={styles.likecont}>200</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', maxWidth: 190 }}>
            <Text style={styles.nameuser} >{user.nombre}</Text>
            <Text style={styles.datouser} >{user.email}</Text>
          </View>
        </View>
        <View style={[styles.funtion, styles.row]}>
          <View style={{ justifyContent: 'space-around' }}>
            <View style={styles.row}>
              <Pencilicons width='32px' height='32px'></Pencilicons>
              <Text style={styles.textfunction}>{user.apellidos}</Text>
            </View>
            <View style={styles.row}>
              <Followersicons width='32px' height='32px'></Followersicons>
              <Text style={styles.textfunction}>seguidores: 800</Text>
            </View>
            <TouchableOpacity onPress={sendmessage}>
              <View style={styles.row}>
                <Whatsappicon width='32px' height='32px'></Whatsappicon>
                <Text style={styles.textfunction}>{user.telefono}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Addfriendicon width="100px" height="100px"></Addfriendicon>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>seguir</Text>
          </View>
        </View>
      </View>
      }
      {!loading && !error && <>
        <Text style={{ marginVertical: 10, fontSize: 20, fontWeight: 'bold' }}>{'productos ofertados: '+pro.length}</Text>
        <ScrollView style={{ marginTop: 20 }} horizontal>
          {pro.map(product => {
            return (
              <Cardcomponent nameboton='ver' pro={product} key={product.id} onpress={()=>{ver(product.id)}} ></Cardcomponent>
            ); 
          })}
        </ScrollView>
      </>
      }

      {proinfo && <Infocard numberofcontact={user.telefono} producto={proinfo} funcion={cerrar}></Infocard>}

      {loading && <View style={styles.centrado}>
        <Loadingicon width='200px' height='200px'></Loadingicon>
        <Buttomgradient arrycolor={['#235f6e', 'gray']} onPress={handlecancelrequest} >cancelar</Buttomgradient>
      </View>}

      {error && <View style={styles.centrado}>
        <Erroricon width='200px' height='200px'></Erroricon>
        <Estilostexto style={styles.m} error >{error.message}</Estilostexto>
        <Buttomgradient arrycolor={['#235f6e', 'gray']} onPress={refresh}>reintentar</Buttomgradient>
      </View>}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  principal: {
    backgroundColor: theme.colors.textPrimary,
    height: 'auto',
    paddingBottom: 30,
    borderBottomRightRadius: 400
  },
  metas: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginVertical: 30,
  }
  , metadatos: {
    color: '#000',
    fontSize: 17,
    fontWeight: '900'
  },
  nameuser: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  datouser: {
    color: 'white',
    fontSize: 15,
  }
  , IMG: {
    width: 150,
    height: 150,
    borderRadius: 1000,
    overflow: 'hidden',
    marginHorizontal: 25
  },
  like: {
    width: 40,
    height: 40
    , borderRadius: 1000,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 5,
    right: 25,
    padding: 10,
  },
  likecont: {
    position: 'absolute',
    top: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 40,
    color: '#fff'
  },
  contdatos: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 30
  },
  textfunction: {
    color: 'white',
    fontSize: 20,
    marginHorizontal: 10
  },
  row: {
    flexDirection: 'row',
  },
  funtion: {
    justifyContent: 'space-around',
  },
  m: {
    textAlign: 'center',
    fontSize: 20,
  },
  centrado: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center'
  }
});

export default VisitarP;



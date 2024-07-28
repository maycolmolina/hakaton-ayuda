import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity ,ScrollView} from "react-native";
import { getData } from "../services/datastorage";
import {
  Whatsappicon,
  Cameraicon,
  Addicons,
  Changeimageicons,
  Idicon,
} from "../../icons/iconsEscalables";
import { useNavigate } from "react-router-native";
import theme from "../../theme";
import getproducct from "../services/busarpordeusuario";
import Cardcomponent from "../vistar perfil/cardpro";

const Perfilview = () => {
  const [pro, setpro] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(false);
  const ruta = useNavigate();

  useEffect(() => {
    obtener();
  }, []);

  async function obtener() {
    try {
      let p = await getData("user");
      if (p != null) {
        setUser(JSON.parse(p));
        let id = JSON.parse(p).id;
        setloading(true);
        let datos = await getproducct(id, "id_propietario");
        await setpro(datos);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setloading(false);
    }
  }
  function navegar() {
    ruta("/cambiarfotoP");
  }
  function Addpro() {
    ruta("/addpro");
  }
  function vermi(value){
    console.log(value);
  }
  return (
    <View style={styles.container}>
      <View style={styles.principal}>
        <View style={styles.contdatos}>
          <View>
            {(user.urlimg === undefined || user.urlimg === "") &&
              user.sexo === "Hombre" && (
                <Image
                  source={require("./perfilhonbre.png")}
                  style={styles.IMG}
                />
              )}
            {(user.urlimg === undefined || user.urlimg === "") &&
              user.sexo === "Mujer" && (
                <Image
                  source={require("./perfilmujer.png")}
                  style={styles.IMG}
                />
              )}
            {user.urlimg != undefined && user.urlimg != "" && (
              <Image source={{ uri: user.urlimg }} style={styles.IMG} />
            )}
            <TouchableOpacity onPress={navegar}>
              <View style={styles.cambioimg}>
                <Changeimageicons></Changeimageicons>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", maxWidth: 190 }}>
            <Text style={styles.nameuser}>{user.nombre}</Text>
            <Text style={styles.datouser}>{user.email}</Text>
          </View>
        </View>
        <View style={[styles.funtion, styles.row]}>
          <View style={{ justifyContent: "space-around" }}>
            <View style={styles.row}>
              <Idicon width="32px" height="32px"></Idicon>
              <Text style={styles.textfunction}>{user.id}</Text>
            </View>
            <View style={styles.row}>
              <Cameraicon width="32px" height="32px"></Cameraicon>
              <Text style={styles.textfunction}>change photo</Text>
            </View>
            <View style={styles.row}>
              <Whatsappicon width="32px" height="32px"></Whatsappicon>
              <Text style={styles.textfunction}>{user.telefono}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={Addpro}>
              <Addicons width="100px" height="100px"></Addicons>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              add porduct
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.metas}>
        <Text style={styles.metadatos}>products: {pro.length}</Text>
        <Text style={styles.metadatos}>likes : 0</Text>
        <Text style={styles.metadatos}>seguidores: 0</Text>
      </View>
      {!loading && <>
        <Text style={{ marginVertical: 10, fontSize: 20, fontWeight: 'bold' }}>{'    productos ofertados '}</Text>
        <ScrollView style={{ marginTop: 20 }} horizontal>
          {pro.map(product => {
            return (
              <Cardcomponent nameboton='edit' pro={product} key={product.id} onpress={()=>{vermi(product.id)}} ></Cardcomponent>
            ); 
          })}
        </ScrollView>
      </>
      }
      {loading && <Text style={{textAlign:'center'}}> verificando productos ......</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  principal: {
    backgroundColor: theme.colors.textPrimary,
    height: "auto",
    borderBottomRightRadius: 400,
  },
  metas: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginVertical: 30,
  },
  metadatos: {
    color: "#000",
    fontSize: 17,
    fontWeight: "900",
  },
  nameuser: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  datouser: {
    color: "white",
    fontSize: 15,
  },
  IMG: {
    width: 150,
    height: 150,
    borderRadius: 1000,
    overflow: "hidden",
    marginHorizontal: 25,
  },
  cambioimg: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    overflow: "hidden",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 5,
    right: 25,
  },
  contdatos: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginVertical: 30,
  },
  textfunction: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  funtion: {
    justifyContent: "space-around",
  },
});

export default Perfilview;

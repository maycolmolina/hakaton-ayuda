import React from "react";
import {FlatList,Text} from "react-native";
import repository from "../../data/repository";
import Listas from "./lista";


const Mostrar = () => {
    return (
        <FlatList 
            data={repository}
            ItemSeparatorComponent={()=> <Text></Text>}
            renderItem=
            {
                ({item:usu})=>
                (
                    <Listas {...usu}/>
                )
            }
        >
        </FlatList>
    )
}
export default Mostrar
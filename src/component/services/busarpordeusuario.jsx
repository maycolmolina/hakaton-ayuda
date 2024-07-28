
import { ref, getDatabase, query, orderByChild, equalTo, get } from "firebase/database";

const  getproducct =async (iduser,searchfor) =>{
    try {
        const realtime = getDatabase();
        const referencia = ref(realtime, 'productosventa')
        const consulta = query(referencia, orderByChild(searchfor),equalTo(iduser) );

        // select from produc where iduser=id_propietario
        
        let snapshot=await get(consulta)
        if (snapshot.exists()){
            const products = [];
            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key;
                const product = childSnapshot.val();
                product.id = key;
                products.push(product); 
            });
            return products;
        } else {
            return [];
        }
    }
    catch (e) {
        return e;
    }
}
export default getproducct;
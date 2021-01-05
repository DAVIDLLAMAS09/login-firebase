import React, { useEffect, useState } from 'react';
import {dataBase} from './Contexts/AuthContext'

function EditProduct({location:{state}}) {
    const {idProducto} = state 
    // estado donde vamos a obtener la data dependiendo del id del  producto
    const [data,setData] = useState({})

 
 const _infoProducto = ()=>{
   const refDoc = dataBase.collection("productos").doc(idProducto)
         refDoc.get().then( doc => {
            if (doc.exists) {
                setData({id: doc.id, ...doc.data()})
            } else {
                console.log("No se encontro un documento!");
            }
        }).catch(function(error) {
            console.log("Error al obtener el documento:", error);
        });
 }

    useEffect(()=>{
       _infoProducto()
    },[])

    return (
        <div>
            <p>edit product component with id: {idProducto}</p>
        </div>
    );
}

export default EditProduct;
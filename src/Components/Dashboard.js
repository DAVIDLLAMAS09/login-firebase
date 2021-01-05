import React, { useEffect, useState} from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {useAuth,dataBase,storageF} from './Contexts/AuthContext'
import Header from './Header'
import Cards from './Cards'
import ModalComponent from  './Modal'

 const Dashboard = ()=> {
    const {currenUser} = useAuth();
    const [date,setDate] = useState(``)
    const [datos,setDatos] = useState([])
    const [modal,setModal] = useState(false)
    
    // variables que contiene el id y el image Name para poder eliminar un producto
    const [id,setId] = useState('')
    const [imageName,setimageName] = useState('')

    // funcion que trae de la db de firebase los productos
    const fetchProductos=async()=>{
        const data = await dataBase.collection('productos').get()
        const arrayData = data.docs.map(producto=>({id:producto.id,...producto.data()}))
        setDatos(arrayData)
    }

    // funcion para crear un nuevo producto
    const crear_producto_temp=()=>{

        let  img = document.querySelector("#imagenprueba")
        if(img.files && img.files[0])
        console.log("File Seleccionado : ", img.files[0]);
        
        // hacemos la referencia de donde se subira la imagen
        let pathReference = storageF.ref(`productos/${img.files[0].name}`);
         let subirArchivo =pathReference.put(img.files[0])

         subirArchivo.on('state_changed',function(archivo){
            console.log('Upload is ' + (archivo.bytesTransferred / archivo.totalBytes) * 100 + '% done');
         },function(error){
            console.log(error);
        },function(){
            // si el archivo se subio correctamente ponemos los datos en la db con la nueva url 
            pathReference.getDownloadURL().then(url =>{
                console.log(url)
                dataBase.collection("productos").add({
                    descripcion: "esta es la descripcion del producto",
                    titulo: "Acondicionador",
                    precio: 500,
                    ImageURL:url,
                    ImageName:img.files[0].name
                })
                fetchProductos()
            })
        })
           
    }

    // funcion para abrir el modal al querer eliminar un producto
    const abrirModal =(id,imageName)=>{
        setModal(true)
        // mandamos los datos el estado
        setId(id)
        setimageName(imageName)
    }

    // cuando se presiona el btn del modal de aceptar elimina el producto
   const _confirmacionEliminarProducto = ()=>{
         //  eliminamos un producto por su id en bd
         dataBase.collection("productos").doc(id).delete()
        // eliminamos la imagen asociada
         let refDelete =storageF.ref(`productos/${imageName}`)
         refDelete.delete().then(response=>{
             setModal(false)
             fetchProductos()
         })
         .catch(err=>console.log(err))
        
    }


    useEffect(()=>{
       currenUser ? setDate(`${new Date(currenUser.metadata.lastSignInTime+' UTC')}`) : (setDate(''))
       fetchProductos()
    },[currenUser])

    return (
        <div>
                    <div id="principal" style={{backgroundImage:'linear-gradient(-45deg, #2196F3 0%, #2196F3 33%, #00BFA5 100%)',borderRadius:5,minHeight:'100vh'}}>
                        <Header />
                        <Container className="mt-md-4 p-md-3">
                        <p>Hora de ultimo acceso:{date}</p>
                         <Row>
                             <Col md={12}>
                             </Col>
                                 { datos.length > 0 ? 
                                 (  
                                     datos.map(p => <Cards key={p.id} {...p} abrirModal={abrirModal} />)
                                ) 
                                 :
                                 (
                                 <Col md={12} style={{boxShadow:'0 10px 15px -5px rgba(62, 57, 107, .07)',backgroundColor:'#FFF',padding:15,borderRadius:10}}>
                                    <h3 style={{textAlign:'center'}}>No se encontraron productos...</h3> 
                                 </Col>
                                 )
                                  
                                 }
                         </Row>
                         <Row>
                             <Col md={12}>
                                 <input type="file" id="imagenprueba" />
                                 <Button onClick={crear_producto_temp}>crear producto</Button>
                             </Col>
                         </Row>
                        </Container> 
                         {/*modal para eliminar un producto donde le pasamos una funcion para ejecutarse desde el modal  */}
                        <ModalComponent handleClose={()=>{setModal(false)}} show={modal} confirmacionEliminarProducto={_confirmacionEliminarProducto} /> 
                    </div>    
        </div>
    );
}

export default Dashboard;
import React, { useEffect,Fragment, useState} from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import {useAuth,dataBase,storageF} from './Contexts/AuthContext'
import Header from './Header'


 const Dashboard = ()=> {
    const {currenUser} = useAuth();
    const [date,setDate] = useState(``)
    const [datos,setDatos] = useState([])

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

    // funcion que elimina un producto y su imagen en storage
    const _EliminarProducto=(id,imagen)=>{
        dataBase.collection("productos").doc(id).delete()
        let refDelete =storageF.ref(`productos/${imagen}`)
        refDelete.delete().then(response=>{
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
                    <Fragment>
                        <Header />
                        <Container className="mt-4">
                         <Row>
                             <Col md={12}>
                             <p>Hora de ultimo acceso:{date}</p>
                             </Col>
                                 {
                                     datos.map(p=>( 
                                    <Col md={3} key={p.id}>
                                       { console.log(p)}
                                        <Card>
                                            <Card.Header>
                                                <h2>Producto</h2>
                                               <img style={{width:'100%'}} src={p.ImageURL} alt="hola"></img>
                                            </Card.Header>
                                            <Card.Body>
                                                <p>{p.titulo}</p>
                                                <p>{p.descripcion}</p>
                                                {/* <p>{p.fechaCreacion.toDate().toString()}</p> */}
                                                <p> MXN ${p.precio}</p>
                                                <Button 
                                                className="btn btn-danger float-md-right"
                                                onClick={()=>_EliminarProducto(p.id,p.ImageName)}
                                                >Borrar Producto</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                     ))
                                 }
                         </Row>
                         <Row>
                             <Col md={12}>
                                 <input type="file" id="imagenprueba" />
                                 <Button onClick={crear_producto_temp}>crear producto</Button>
                             </Col>
                         </Row>
                        </Container>   
                    </Fragment>    
        </div>
    );
}

export default Dashboard;
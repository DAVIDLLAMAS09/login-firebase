import React from 'react';
import { Fragment } from 'react';
import {Col,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import deleteIcon from '../img/Eliminar.png'
import editIcon from '../img/editar.png'
function Cards({ImageName,ImageURL,descripcion,id,precio,titulo,abrirModal}) {
    
     // funcion que pasa los parametros al componente padre (dashboard)
     const _EliminarProducto=(id,imagen)=>{
         abrirModal(id,imagen)
       
    }

    return (
        <Fragment>
             <Col md={3}>                    
                <Card className="card-contenedor">
                     <Card.Header className="card-image">
                        <img style={{width:'100%'}} src={ImageURL} alt="hola"></img>
                    </Card.Header>
                    <Card.Body>
                        <p className="titulo">{titulo}</p>
                        <p className="descripcion">{descripcion}</p>
                        <p className="text-center pr-2 precioProducto"> MXN ${precio}</p>
                        <img className="deleteIcon btn-borrar"  onClick={()=>_EliminarProducto(id,ImageName)} src={deleteIcon} alt="delete"></img>
                        <Link
                            to={{
                                pathname:`/edit-product/${id}`,
                                state:{
                                    idProducto:id
                                }
                            }}
                            >
                             <img className="editIcon btn-edit"   src={editIcon} alt="delete"></img>
                        </Link>
                       
                       
                    </Card.Body>
                 </Card>
            </Col>
        </Fragment>
    );
}

export default Cards;
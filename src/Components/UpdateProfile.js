import React,{Fragment, useState} from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import Header from './Header';
import Avatar from '../img/avatar.png';

function UpdateProfile(props) {
    const {imgUser} = props.location.state || "";
    const {nameUser} = props.location.state || ""
    const [changeImage,setChangeImage] = useState(false);
    const [Image,setImage] = useState()

    const onchangeImage=(e)=>{
        let img = e.target.files[0];
        let reader = new FileReader();
    
        try{
          reader.readAsDataURL(img);
          reader.onload = (e)=> {
            let validador = e.target.result.split("/");
            if(validador[0] === 'data:image'){
                setChangeImage(true)
                setImage(e.target.result)    
            }
    
          }
        }catch (error){
          console.log(error)
          setChangeImage(false)
          setImage('')  
        }
    }
    
    return (
        <Fragment>
            <Header />
            <Container>
                <Row>
                    <Col md={12} className="mt-5 updateContenedor">
                        <h3 className="mt-5 text-center">Actualizar Perfil</h3>
                        <p className="text-center">{nameUser}</p>
                        <div className="imageUpdateProfile" >
                            <label htmlFor="input" style={{minWidth:'100%'}}>
                                <img src={changeImage ? (Image): (imgUser? imgUser: Avatar)} alt={nameUser} />
                            </label>
                        </div>
                        <input className="d-none" type="file" accept="image/*" name="image-upload" id="input" onChange={onchangeImage} />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default UpdateProfile;
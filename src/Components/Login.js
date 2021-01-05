import React,{useRef, useState} from 'react';
import { Fragment } from 'react';
import {Form,Button,Card, Container,Alert, Row, Col} from 'react-bootstrap'
import  { useAuth } from './Contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'

function SignUp() {
    const [show,setShow] = useState(false)
    const [error,setError] = useState('')
    const history = useHistory()
    // referencias a los elementos en el dom
    const emailRef = useRef();
    const passwordRef = useRef();
    // traemos los valores que pasamos en el provider value
    const {Login,socialLoginFacebook,socialLoginGoogle} = useAuth()
        // console.log(currenUser);

    // cuando se aprieta en el boton de iniciar sesion
    const onSubmit=(e)=>{
        e.preventDefault()
        if(emailRef.current.value === "" && passwordRef === ""){
            setShow(true)
            setError('Email and password are required')
            return
        }
        
        Login(emailRef.current.value,passwordRef.current.value)
        .then(user=>{
            console.log(user);
           history.push("/dashboard")
        })
        .catch(err =>{
            setShow(true)
            setError(err.message)
        })
    }

    // iniciar con google

  const  AutenticarGoogle = ()=>{
       socialLoginGoogle()
        .then(result => {
            console.log(result);
            history.push("/dashboard")
        })
   }

//    iniciar con facebook
   const  AutenticarFacebook = ()=>{
    socialLoginFacebook()
     .then(result => {
         console.log(result.additionalUserInfo.profile.picture.data.url);
         history.push("/dashboard")
     })
}


    return (
        <Fragment>
            <section className="principal">
                <Container className="d-flex align-items-center justify-content-center vw-100 vh-100 ">
                    <Card className="loginContenedor fondoForm">
                        {show &&
                        <Alert className="text-center" variant="danger">{error}</Alert>
                        }
                        <Card.Body>
                            <h2 className="mb-4 text-center tituloLogin" style={{color:'#001781'}}>Iniciar Sesión</h2>
                            {/* { currenUser && currenUser.email} */}
                            <Form onSubmit={onSubmit}>
                                <Form.Group>
                                    <Form.Label className="FormLabel">Correo Electrónico</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="FormLabel">Contraseña</Form.Label>
                                    <Form.Control type="pasword" ref={passwordRef} required></Form.Control>
                                </Form.Group>
                                <Button  className="w-100 btn-login" type="submit">Iniciar Sesión</Button>
                               
                            </Form>
                            
                           <Row>
                               <Col md={12}><p className="text-center mt-2 mb-0">Ó</p></Col>
                               <Col md={6}>
                               <Button
                                    type="danger"
                                    className="w-100 mt-2"
                                    style={{ marginRight: 10,backgroundColor:'#EA4335',border:'none' }}
                                    onClick={AutenticarGoogle}
                                >Iniciar sesión con Google</Button>
                           
                               </Col>
                               <Col md={6}>
                               <Button
                                    type="danger"
                                    className="w-100 mt-2"
                                    style={{ marginRight: 10,backgroundColor:'#3A5795',border:'none' }}
                                    onClick={AutenticarFacebook}
                                >Iniciar sesión con Facebook</Button>
                               </Col>
                           </Row>
                        </Card.Body>
                        <div className="w-100 mt-2 mb-2 text-center">
                            ¿No tienes una cuenta? <Link to="/signup">Registrate</Link>
                        </div>
                        <div className="w-100 mt-2 mb-2 text-center">
                             <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                        </div>
                    </Card>
                
                </Container>
            </section>
        </Fragment>
    );
}

export default SignUp;
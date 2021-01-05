import React,{useRef, useState} from 'react';
import { Fragment } from 'react';
import {Form,Button,Card, Container,Alert, Row, Col} from 'react-bootstrap'
import  { useAuth } from './Contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'

function ForgotPassword() {
    const [show,setShow] = useState(false)
    const [error,setError] = useState('')
    const [typeAlert,setTypeAlert] = useState('danger')
    const history = useHistory()
    // referencias a los elementos en el dom
    const emailRef = useRef();
    // traemos los valores que pasamos en el provider value
    const {ResetPass} = useAuth()
        // console.log(currenUser);

    // cuando se aprieta en el boton de iniciar sesion
    const onSubmit=(e)=>{
        let actionCodeSettings = {
            // After password reset, the user will be give the ability to go back
            // to this page.
            url: 'http://localhost:3000/?email='+emailRef.current.value,
            handleCodeInApp: false
          };

        e.preventDefault()
        if(emailRef.current.value === ""){
            setShow(true)
            setError('Email are required')
            return
        }
        
        ResetPass(emailRef.current.value,actionCodeSettings)
        .then(user=>{
            // console.log(user);
            setShow(true)
            setTypeAlert('success')
            setError(`Se ha enviado un correo electrónico a ${emailRef.current.value}. Favor de revisar en bandeja de entrada o correo no deseado`);
            emailRef.current.value = ''
            setTimeout(()=>{history.push("/")},5000) 
        
        })
        .catch(err =>{
            setShow(true)
            setTypeAlert('danger')
            setError(err.message)
        })
    }




    return (
        <Fragment>
            <section className="principal">
                <Container className="d-flex align-items-center justify-content-center vw-100 vh-100 ">
                    <Card className="forgorContenedor fondoForm">
                        {show &&
                            <Alert className="text-center" variant={typeAlert}>{error}</Alert>
                        }
                        <Card.Body>
                            <h2 className="mb-md-4 text-center tituloLogin" style={{color:'#001781'}}>Recuperar Contraseña</h2>
                            <Form onSubmit={onSubmit}>
                                <Form.Group>
                                    <Form.Label className="FormLabel">Correo Electrónico</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                                </Form.Group>
                                <Button  className="w-100 btn-login" type="submit">Recupera tu cuenta</Button>       
                            </Form>
                        </Card.Body>
                        <div className="w-100 mt-2 mb-2 text-center">
                          <Link to="/">Regresar</Link>
                        </div>
                    </Card>
                
                </Container>
            </section>
        </Fragment>
    );
}

export default ForgotPassword;
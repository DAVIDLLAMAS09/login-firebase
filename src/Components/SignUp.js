import React,{useRef, useState} from 'react';
import { Fragment } from 'react';
import {Form,Button,Card, Container,Alert} from 'react-bootstrap'
import  { useAuth } from './Contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'

function SignUp() {
    const [show,setShow] = useState(false)
    const [error,setError] = useState('')
    const history = useHistory();

    // referencias a los elementos en el dom
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    // traemos los valores que pasamos en el provider value
    const {Registrar} = useAuth()
        
    const onSubmit=(e)=>{
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmationRef.current.value){
            setShow(true)
            setError('Password do not match!')
            return
        }
        Registrar(emailRef.current.value,passwordRef.current.value)
        .then(user=>{
             history.push("/dashboard")
        })
        .catch(err =>{
            setShow(true)
            setError(err.message)
        })
    }

    return (
        <Fragment>
            <section className="principal">
                <Container className="d-flex align-items-center justify-content-center vw-100 vh-100">
                    <Card className="signUpContenedor fondoForm">
                        {show &&
                        <Alert className="text-center" variant="danger">{error}</Alert>
                        }
                        <Card.Body>
                            <h2 className="mb-4 text-center tituloRegister" style={{color:'#001781'}}>Regístrate</h2>
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

                                <Form.Group>
                                    <Form.Label className="FormLabel">Confirmar Contraseña</Form.Label>
                                    <Form.Control type="pasword" ref={passwordConfirmationRef} required></Form.Control>
                                </Form.Group>
                                <Button  className="w-100 btn-login" type="submit">Regístrate</Button>
                            </Form>
                        </Card.Body>
                        <div className="w-100 mt-2 mb-2 text-center">
                            ¿Tienes una cuenta? <Link to="/">Iniciar Sesión</Link>
                        </div>
                    </Card>
                
                </Container>
            </section>
        </Fragment>
    );
}

export default SignUp;
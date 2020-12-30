import React, { useEffect,Fragment, useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {useAuth} from './Contexts/AuthContext'
import Header from './Header'


 const Dashboard = ()=> {
    const {currenUser} = useAuth();
    const [date,setDate] = useState(``)
    
    useEffect(()=>{
       currenUser ? setDate(`${new Date(currenUser.metadata.lastSignInTime+' UTC')}`) : (setDate(''))
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
                         </Row>
                        </Container>   
                    </Fragment>    
        </div>
    );
}

export default Dashboard;
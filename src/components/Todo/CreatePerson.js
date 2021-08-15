import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Navbar, Nav, Col, Card, CardDeck, ListGroup, ListGroupItem } from 'react-bootstrap';

export default CreatePerson = () =>{
    const [person, setPerson] = useState({
        name: ''
    });
    const personOnChange =(e) =>{
        setPerson({
            ...person,
            person: e.target.value
        })
    }
    return (
        <Container>
           <Row>
               <Col>
               <input type="text" value={person.name} onChange={{}}></input>
               </Col>
               <Col>
               <Button>Add Person</Button>
               </Col>
           </Row>
           <Row>
               <table>
                   <thead>
                       <th>
                           Name
                       </th>
                       <th>
                           Action
                       </th>
                   </thead>
                   <tbody>
                       
                   </tbody>
               </table>
           </Row>
        </Container>
    )
}
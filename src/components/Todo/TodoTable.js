import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Navbar, Nav, Col, Card, CardDeck, ListGroup, ListGroupItem } from 'react-bootstrap';

export default TodoTable = (props) => {
    return (
        <table responsive="sm" striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Assign To</th>
                    <th>Duration</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <th><input type="text" placeholder="Search"></input></th>
                    <th><input type="text" placeholder="Search"></input></th>
                    <th><input type="text" placeholder="Search"></input></th>
                    <th><input type="text" placeholder="Search"></input></th>
                </tr>
            </thead>
            <body>
                {props.tableData.map((key, value) => {
                    <tr>
                    <td>{value.title}</td>
                    <td>{value.person}</td>
                    <td>{value.startDate} to {value.endDate}</td>
                    <td>
                        <Button onClick={props.FormAction('edit',  key)}>Edit</Button>
                        <Button onClick={props.FormAction('clone', key)}>Clone</Button>
                        <Button onClick={props.FormAction('delete', key)}>Delete</Button>
                    </td>
                </tr>
                })}
            </body>
        </table>
    )
}
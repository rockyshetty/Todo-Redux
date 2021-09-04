import React, { useRef, useEffect, useState } from "react";
import * as ReactBootstrap from 'react-bootstrap';
const  TodoTable = (props) => {
    return (
        <ReactBootstrap.Table striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Assign To</th>
                    <th>Duration</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <th><ReactBootstrap.FormControl type="text" placeholder="Search"></ReactBootstrap.FormControl></th>
                    <th><ReactBootstrap.FormControl type="text" placeholder="Search"></ReactBootstrap.FormControl></th>
                    <th><ReactBootstrap.FormControl type="text" placeholder="Search"></ReactBootstrap.FormControl></th>
                    <th><ReactBootstrap.FormControl type="text" placeholder="Search"></ReactBootstrap.FormControl></th>
                </tr>
            </thead>
            <tbody>
                {props.tabelData.todos.map((value, index) => {
                    return <tr key={index}>
                    <td>{value.title}</td>
                    <td>{value.person}</td>
                    <td>{value.startDate} to {value.endDate}</td>
                    <td>
                        <span onClick={(e)=>props.FormtodoAction('edit',  value)}>Edit</span>
                        <span onClick={(e)=>props.FormtodoAction('clone', value)}>Clone</span>
                        <span onClick={(e)=>props.FormtodoAction('delete', value)}>Delete</span>
                    </td>
                </tr>
                })}
            </tbody>
        </ReactBootstrap.Table>
    )
}

export default TodoTable
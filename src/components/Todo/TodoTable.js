import React, { useRef, useEffect, useState } from "react";
import * as ReactBootstrap from 'react-bootstrap';
const  TodoTable = (props) => {
    return (
        <ReactBootstrap.Container>
        <table striped bordered hover>
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
            <body>
                {props.tableData.length >0 && props.tableData.map((key, value) => {
                    <tr>
                    <td>{value.title}</td>
                    <td>{value.person}</td>
                    <td>{value.startDate} to {value.endDate}</td>
                    <td>
                        <span onClick={props.FormAction('edit',  key)}>Edit</span>
                        <span onClick={props.FormAction('clone', key)}>Clone</span>
                        <span onClick={props.FormAction('delete', key)}>Delete</span>
                    </td>
                </tr>
                })}
            </body>
        </table>
        </ReactBootstrap.Container>
    )
}

export default TodoTable
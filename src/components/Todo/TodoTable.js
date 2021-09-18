import React, { useRef, useEffect, useState } from "react";
import * as ReactBootstrap from 'react-bootstrap';
import Paginator from "../../common/paginator";
const  TodoTable = (props) => {
    return (
        <ReactBootstrap.Card className="overView">
            <ReactBootstrap.Card.Header>
                <ReactBootstrap.Card.Title className="text-center">
                Todo Overview
                </ReactBootstrap.Card.Title>
            </ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body>
        <ReactBootstrap.Table striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Assign To</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <th><ReactBootstrap.FormControl type="text" placeholder="Search" name="title" value={props.searchState.title} onChange={(e)=>props.searchFilter(e)} onKeyUp={(e)=>props.onKeyUp(e)}></ReactBootstrap.FormControl></th>
                    <th><ReactBootstrap.FormControl type="text" placeholder="Search" name="person" value={props.searchState.person} onChange={(e)=>props.searchFilter(e)} onKeyUp={(e)=>props.onKeyUp(e)}></ReactBootstrap.FormControl></th>
                    <th><ReactBootstrap.FormControl type="text" placeholder="Search" name="startDate" value={props.searchState.startDate} onChange={(e)=>props.searchFilter(e)} onKeyUp={(e)=>props.onKeyUp(e)}></ReactBootstrap.FormControl></th>
                    <th><ReactBootstrap.FormControl type="text" placeholder="Search" name="endDate" value={props.searchState.endDate} onChange={(e)=>props.searchFilter(e)} onKeyUp={(e)=>props.onKeyUp(e)}></ReactBootstrap.FormControl></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.tabelData.todos.map((value, index) => {
                    return <tr key={index}>
                    <td>{value.title}</td>
                    <td>{value.person}</td>
                    <td>{value.startDate}</td>
                    <td>{value.endDate}</td>
                    <td className="d-flex justify-content-center">
                        <div className="p-1" onClick={(e)=>props.FormtodoAction('edit',  value)}><i class="fas fa-edit" title="Edit"></i></div>
                        <div className="p-1"onClick={(e)=>props.FormtodoAction('clone', value)}><i class="far fa-copy" title="Clone"></i></div>
                        <div className="p-1" onClick={(e)=>props.FormtodoAction('delete', value)}><i class="fas fa-trash-alt" title="Delete"></i></div>
                    </td>
                </tr>
                })}
            </tbody>
        </ReactBootstrap.Table>
        </ReactBootstrap.Card.Body>
        <ReactBootstrap.Card.Footer  className="d-flex justify-content-center  border-top-0 pt-3">
        {/* <Paginator count={tablePagesCount} active={active} changePage={changePage} size="md"/> */}
        </ReactBootstrap.Card.Footer>
        </ReactBootstrap.Card>
    )
}

export default TodoTable
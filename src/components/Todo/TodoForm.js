import React, { useRef, useEffect, useState } from "react";
import * as ReactBootstrap from 'react-bootstrap';
import { useSelector } from 'react-redux';
const TodoForm = (props) => {
    const PersonsList = useSelector((state) => state.persons.value);
    return (
        <ReactBootstrap.Card>
            <ReactBootstrap.Card.Header>
                <ReactBootstrap.Card.Title className="text-center">
                    TODO
                </ReactBootstrap.Card.Title>
            </ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body>
        <ReactBootstrap.Form className="p-2">
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label className="col-md-4">
                        Title
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control className="col-md-8" type="text" value={props.formData.title} onChange={(e)=>props.onChangeTitile(e)}/>
                </ReactBootstrap.Row>
                {props.error.title && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{props.error.title}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label className="col-md-4">
                        Description
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control className="col-md-8" as="textarea" value={props.formData.description} onChange={(e)=>props.onChangeDescription(e)}/>
                </ReactBootstrap.Row>
                {props.error.description && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{props.error.description}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label className="col-md-4">
                        Person
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control as="select" onChange={(e)=>props.onChangePersons(e)} value={props.formData.person ? props.formData.person : ''} className="col-md-8">
                        <option disabled selected value="" key={-1}>select</option>
                        {PersonsList.map(personName => { return <option value={personName}>{personName}</option> })}
                    </ReactBootstrap.Form.Control>
                </ReactBootstrap.Row>
                {props.error.person && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{props.error.person}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label>
                        Start Date
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control type="date" value={props.formData.startDate} onChange={(e)=>props.onChangeStartDate(e)}/>
                </ReactBootstrap.Row>
                {props.error.startDate && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{props.error.startDate}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label>
                        End Date
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control type="date" value={props.formData.endDate} onChange={(e)=>props.onChangeEndDate(e)}/>
                </ReactBootstrap.Row>
                {props.error.endDate && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{props.error.endDate}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>  
        </ReactBootstrap.Form>
        </ReactBootstrap.Card.Body>
        <ReactBootstrap.Card.Footer className="float-right">
            <ReactBootstrap.Row className="col-md-12  d-flex justify-content-center">
                <ReactBootstrap.Button className="col-md-5 m-2 btn-success" onClick={(e)=>props.formSubmit()}>Save</ReactBootstrap.Button>
                <ReactBootstrap.Button className="col-md-5 m-2 btn-danger" onClick={(e)=>props.formReset()}>Cancel</ReactBootstrap.Button>
            </ReactBootstrap.Row>
        </ReactBootstrap.Card.Footer>
        </ReactBootstrap.Card>
    )
}

export default TodoForm;
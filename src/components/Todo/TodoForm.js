import React, { useRef, useEffect, useState } from "react";
import * as ReactBootstrap from 'react-bootstrap';
import { useSelector } from 'react-redux';
const TodoForm = (props) => {
    const PersonsList = useSelector((state) => state.persons.value);
    return (
        <ReactBootstrap.Form className="p-2">
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label className="col-md-4">
                        Title
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control className="col-md-8" type="text" value={props.formData.title} />
                </ReactBootstrap.Row>
                {props.error.name && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{props.error.title}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label className="col-md-4">
                        Description
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control className="col-md-8" as="textarea" value={props.formData.description} />
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
                    <ReactBootstrap.Form.Select className="col-md-8">
                    {PersonsList.map(personName=>{return <option value={personName}>{personName}</option>})}
                    </ReactBootstrap.Form.Select>
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
                    <ReactBootstrap.Form.Control type="date" value={props.formData.startDate} />
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
                    <ReactBootstrap.Form.Control type="date" value={props.formData.endDate} />
                </ReactBootstrap.Row>
                {props.error.endDate && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{props.error.endDate}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="row mt-2" >
                <ReactBootstrap.Button className="m-1">Submit</ReactBootstrap.Button>
                <ReactBootstrap.Button className="m-1">Clear</ReactBootstrap.Button>
            </ReactBootstrap.Form.Group>
        </ReactBootstrap.Form>
    )
}

export default TodoForm;
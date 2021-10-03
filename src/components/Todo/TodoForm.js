import React, { useEffect, useState } from "react";
import * as ReactBootstrap from 'react-bootstrap';
import { useSelector } from 'react-redux';

const TodoForm = (props) => {

    const PersonsList = useSelector((state) => state.persons.value);
    
    const [formstate, setFormState] = useState({
        id: 0,
        title: '',
        person: '',
        description: '',
        startDate: '',
        endDate: '',
        errorTitle: '',
        errorPerson: '',
        errorStateDate: '',
        errorEndDate: ''
    });

    useEffect(async() =>{
      await dataLoad() 
    }, [])
    
    useEffect(async() =>{
        await dataLoad() 
      }, [props])
       
    const dataLoad = () => {
        let formData = props.formData;
        setFormState({
            ...formstate,
            id: formData.id ? formData.id : 0,
            title: formData.title ? formData.title : '',
            person: formData.person ? formData.person : '',
            description: formData.description ? formData.description : '',
            startDate: formData.startDate ? formData.startDate : '',
            endDate: formData.endDate ? formData.endDate : '',
            errorTitle: '',
            errorPerson: '',
            errorStateDate: '',
            errorEndDate: ''
        })
    }

    const onChangeText = (e) => {
        setFormState({
            ...formstate,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async () =>{
        // if (await validations()) {
            await props.formSubmit(formstate);
            await formCancel();
        // }
    }

    const formCancel = () =>{
        setFormState({
            ...formstate,
            id: 0,
            title: '',
            person: '',
            description: '',
            startDate: '',
            endDate: '',
            errorTitle: '',
            errorPerson: '',
            errorStateDate: '',
            errorEndDate: ''
        })
    }

    const validations = async () =>{
        if (! formstate.title.trim()) {
            await setFormState({
                ...formstate,
                errorTitle: 'Title is mandatory',
           })
            return 
        } else if(! formstate.description.trim()) {
                await setFormState({
                    ...formstate,
                    errorTitle: '',
                    errorDescription: 'Description is mandatory'
               })
            return 
        } else if(! formstate.person.trim()) {
            await setFormState({
                ...formstate,
                errorTitle: '',
                errorDescription: '',
                errorPerson: 'Person is mandatory'
           })
            return 
        } else if (! formstate.startDate || !formstate.endDate) {
            await setFormState({
                ...formstate,
                errorTitle: '',
                errorDescription: '',
                errorPerson: '',
                errorStartDate: ! formstate.startDate ? "StartDate is mandatory" : formstate.startDate,
                errorEndDate: ! formstate.endDate ? "EndDate is mandatory" : formstate.endDate, 
           })
            return 
        } else if(formstate.startDate > formstate.endDate) {
            await setFormState({
                ...formstate,
                errorTitle: '',
                errorDescription: '',
                errorPerson: '',
                errorStartDate: "please select correct date",
                errorEndDate: "please select correct date", 
           })
            return 
        }
        await setFormState({
            ...formstate,
            errorTitle: '',
            errorDescription: '',
            errorPerson: '',
            errorStartDate: "",
            errorEndDate: "", 
       })
       return true;
    }
    
    return (
        <ReactBootstrap.Card>
            <ReactBootstrap.Card.Header>
                <ReactBootstrap.Card.Title className="text-center">TODO</ReactBootstrap.Card.Title>
            </ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body>
        <ReactBootstrap.Form className="p-2">
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label className="col-md-4">Title</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control 
                    className="col-md-8" 
                    type="text" 
                    name="title" 
                    value={formstate.title} 
                    onChange={(e)=>onChangeText(e)}/>
                </ReactBootstrap.Row>
                {formstate.errorTitle && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{formstate.errorTitle}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label className="col-md-4">Description</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control 
                    className="col-md-8" 
                    as="textarea" 
                    name="description" 
                    value={formstate.description} 
                    onChange={(e)=>onChangeText(e)}/>
                </ReactBootstrap.Row>
                {formstate.errorDescription && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{formstate.errorDescription}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label className="col-md-4">Person</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control 
                    as="select" 
                    name="person" 
                    onChange={(e)=>onChangeText(e)} 
                    value={formstate.person ? formstate.person : ''} 
                    className="col-md-8">
                        <option disabled selected value="" key={-1}>select</option>
                        {Object.entries(PersonsList).map(([key, value]) => { return <option value={key}>{value}</option> })}
                    </ReactBootstrap.Form.Control>
                </ReactBootstrap.Row>
                {formstate.errorPerson && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{formstate.errorPerson}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label>Start Date</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control 
                    type="date" 
                    name="startDate" 
                    value={formstate.startDate} 
                    onChange={(e)=>onChangeText(e)}/>
                </ReactBootstrap.Row>
                {formstate.errorStartDate && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{formstate.errorStartDate}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="mt-2">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Label>End Date</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control 
                    type="date" 
                    name="endDate" 
                    value={formstate.endDate} 
                    onChange={(e)=>onChangeText(e)}/>
                </ReactBootstrap.Row>
                {formstate.errorEndDate && <ReactBootstrap.Row>
                    <ReactBootstrap.Form.Text className="text-muted">{formstate.errorEndDate}</ReactBootstrap.Form.Text>
                </ReactBootstrap.Row>}
            </ReactBootstrap.Form.Group>  
        </ReactBootstrap.Form>
        </ReactBootstrap.Card.Body>
        <ReactBootstrap.Card.Footer className="float-right">
            <ReactBootstrap.Row className="col-md-12  d-flex justify-content-center">
                <ReactBootstrap.Button 
                className="col-md-5 m-2 btn-success" 
                onClick={(e)=>formSubmit()}>Save</ReactBootstrap.Button>
                <ReactBootstrap.Button 
                className="col-md-5 m-2 btn-danger" 
                onClick={(e)=> formCancel()}>Cancel</ReactBootstrap.Button>
            </ReactBootstrap.Row>
        </ReactBootstrap.Card.Footer>
        </ReactBootstrap.Card>
    )
}

export default TodoForm
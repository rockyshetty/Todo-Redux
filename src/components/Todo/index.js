import { useState } from 'react';
import { Container, Row, Navbar, Nav, Col, Card, CardDeck, ListGroup, ListGroupItem } from 'react-bootstrap';
import TodoForm from './TodoForm';
import TodoTable from './TodoTable';
import CreatePerson from './CreatePerson';
import * as ReactBootstrap from 'react-bootstrap';
const MainPage = () => {
    const [formstate, setFormState] = useState({
        title: '',
        person: '',
        description: '',
        startDate: '',
        endDate: '',
    });
    const [errorState, setErrorState] = useState({
        title: '',
        person: '',
        description: '',
        startDate: '',
        endDate: '',
    });
    const [tableState, setTableState] = useState({
        action: 'create',
        active: 1,
        tableData: [],
    });
    const [personState, setPersonState] = useState({
        showPopUp: false
    })
    const createNewTodo = () => {

    }

    const openPersonPopUp = () => {

    }
    const formAction = (action) => {
        switch (action) {
            case "create":
                break;
            case "edit":
                break;
            case "clone":
                break;
            case "delete":
                break;
        }
    }
    const commonFormState = async(currenState, mergingstate, title, person, description, startDate, endDate) =>{
        await currenState({
             ...mergingstate,
             title: title,
             person: person,
             description: description,
             startDate: startDate,
             endDate: endDate,
        })
    }
    const validations = async () =>{
        let uniqTitles = tableState.tableData.map(value=>{return value.title});
        if (!formstate.title.trim()) {
            await commonFormState(
                setErrorState,
                errorState,
                'Title is mandatory',
                errorState.person,
                errorState.description, 
                errorState.startDate, 
                errorState.endDate
            )
            return 
        } else if(!formstate.description.trim()) {
            await commonFormState(
                setErrorState,
                errorState,
                errorState.title,
                errorState.person,
                'Description is mandatory', 
                errorState.startDate, 
                errorState.endDate
            )
            return 
        } else if(!formstate.person.trim()) {
            await commonFormState(
                setErrorState,
                errorState,
                errorState.title,
                'Person is mandatory',
                errorState.description, 
                errorState.startDate, 
                errorState.endDate
            )
            return 
        } else if (!formstate.startDate || !formstate.endDate) {
            await commonFormState(
                setErrorState,
                errorState,
                errorState.title,
                errorState.person,
                errorState.description, 
                ! errorState.startDate ? "StartDate is mandatory" : errorState.startDate,
                ! errorState.endDate ? "EndDate is mandatory" : errorState.endDate,   
            )
            return 
        } else if(formstate.startDate > formstate.endDate) {
            await commonFormState(
                setErrorState,
                errorState,
                errorState.title,
                errorState.person,
                errorState.description, 
                "please select correct date",
                "please select correct date",   
            )
            return 
        }else if(
            (tableState.action === 'create' && uniqTitles.includes(formstate.title.trim())) ||
            tableState.action !== 'create' && uniqTitles.includes(formstate.title.trim()).length > 1
            ) {
            await commonFormState(
                setErrorState,
                errorState,
                "Please enter unique title",
                errorState.person,
                errorState.description, 
                errorState.startDate,
                errorState.endDate,   
            )
            return 
        }
            await commonFormState(setErrorState, errorState, '', '', '', '', ''); //reset all error values
            await commonFormState(setFormState, formstate, '', '', '', '', '');  //reset all form values
       return true;
    }
    const showHidePersonPopUp = () =>{
        setPersonState({
            ...personState,
            showPopUp:!personState.showPopUp
        });
    }
    const PersonPopUp = () =>{
       return <ReactBootstrap.Modal
        size="lg"
        show={personState.showPopUp}
        onHide={(e) => showHidePersonPopUp()}
        aria-labelledby="example-modal-sizes-title-sm">
            <ReactBootstrap.Modal.Header closeButton>
                <ReactBootstrap.Modal.Title>
                    Person Overview
                </ReactBootstrap.Modal.Title>
            </ReactBootstrap.Modal.Header>
            <ReactBootstrap.Modal.Body>
            {CreatePerson()}
            </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
    }
    return (
        <ReactBootstrap.Container>
            <ReactBootstrap.Row className="float-right">
                <ReactBootstrap.Button onClick={(e)=>formAction,0}>New Todo</ReactBootstrap.Button>
                <ReactBootstrap.Button onClick={(e)=>showHidePersonPopUp()}>Persons</ReactBootstrap.Button>
            </ReactBootstrap.Row>
            <ReactBootstrap.Row>
                <ReactBootstrap.Col className="col-md-8">
                    <TodoTable tableData={tableState} FormAction={formAction}/>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col className="col-md-4">
                    <TodoForm formData={formstate} error={errorState} />
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            {PersonPopUp()}
        </ReactBootstrap.Container>
    )
}
export default MainPage;
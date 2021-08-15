import { useState } from 'react';
import { Container, Row, Navbar, Nav, Col, Card, CardDeck, ListGroup, ListGroupItem } from 'react-bootstrap';
import TodoForm from './TodoForm';
import TodoTable from './TodoTable';
import CreatePerson from './CreatePerson';
export default MainPage = () => {
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
        tableDate: [],
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
                createTodo();
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
    const createTodo = async () =>{
        if (!formstate.title.trim()) {
            await commonFormState(
                setErrorState,
                errorState,
                'Title is mandatory',
                person,
                description, 
                startDate, 
                endDate
            )
            return 
        } else if(!formstate.description.trim()) {
            await commonFormState(
                setErrorState,
                errorState,
                title,
                person,
                'Description is mandatory', 
                startDate, 
                endDate
            )
            return 
        } else if(!formstate.person.trim()) {
            await commonFormState(
                setErrorState,
                errorState,
                title,
                'Person is mandatory',
                description, 
                startDate, 
                endDate
            )
            return 
        } else if (!formstate.startDate || !formstate.endDate) {
            await commonFormState(
                setErrorState,
                errorState,
                title,
                person,
                description, 
                ! startDate ? "StartDate is mandatory" : startDate,
                ! endDate ? "EndDate is mandatory" : endDate,   
            )
            return 
        } else {
            await commonFormState(setErrorState, errorState, '', '', '', '', ''); //reset all values
            await commonFormState(setFormState, formstate, '', '', '', '', ''); //reset all values
        }
    }
    return (
        <Container>
            <Row className="float-right">
                <Button onClick={formAction,0}>New Todo</Button>
                <Button>Persons</Button>
            </Row>
            <Row>
                <Col className="col-md-6">
                    <TodoTable tableData={tableState} FormAction={formAction}/>
                </Col>
                <Col className="col-md-6">
                    <TodoForm formData={formstate} error={errorState} />
                </Col>
            </Row>
        </Container>
    )
}
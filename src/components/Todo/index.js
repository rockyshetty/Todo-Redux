import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoTable from './TodoTable';
import CreatePerson from './CreatePerson';
import * as ReactBootstrap from 'react-bootstrap';
import { SearchFilter } from '../../common/searchFilter';

const MainPage = () => {

    const [state, setState] = useState({
        formData: {},
        showPersonPopUp: false,
        tabelData: []
    })
    
    const tableActions = async (data, action) => {
        let { tabelData } = state;
        switch (action) {
            case "edit":
                filteredRow = await tabelData.filter(value => value.id == data.id);
                await setState({
                    ...state,
                    formData: filteredRow[0]
                });
                break
            case "clone":
                var filteredRow = tabelData.filter(value => value.id === data.id);
                let clonedRow = Object.assign({}, filteredRow[0], { id: SearchFilter.getUniqNumericNotpresentInData(tabelData) })
                await setState({
                    ...state,
                    tabelData: [...tabelData, clonedRow]
                });
                break
            case "delete":
                tabelData = tabelData.filter(value => value.id != data.id);
                await setState({
                    ...state,
                    tabelData: [...tabelData]
                });
                break
        }
    }

    const showHidePersonPopUp = () =>{
        setState({
            ...state,
            showPersonPopUp: !state.showPersonPopUp
        });
    }

    const formSubmit = async (formstate) =>{
        let {tabelData} = state;
        let formData = {
            id: formstate.id > 0 ? formstate.id : SearchFilter.getUniqNumericNotpresentInData(tabelData),
            title: formstate.title,
            person: formstate.person,
            description: formstate.description,
            startDate: formstate.startDate,
            endDate: formstate.endDate,
        } 
        let resultData = tabelData.filter(value => value.id == formData.id) ;
         if (resultData.length > 0) {
            tabelData = tabelData.filter(value => value.id != formData.id);
         }
        await setState({
            ...state,                     
            tabelData: [...tabelData,formData],
            formData: {}
        })     
    }

    const newTodo = () => {
         setState({
            ...state,
            formData: {}
        })
    }

    const PersonPopUp = () => {
       return <ReactBootstrap.Modal
        size="lg"
        show={state.showPersonPopUp}
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
            <ReactBootstrap.Row>
                <ReactBootstrap.Button className="col-md-2 m-2 btn-light"  onClick={(e) => newTodo()}>
                    <i class="fas fa-plus-circle"></i>
                    <span className="ml-2">New Todo</span>
                </ReactBootstrap.Button>
                <ReactBootstrap.Button className="col-md-2 m-2 btn-warning" onClick={(e) => showHidePersonPopUp()}>
                    <i class="fas fa-users"></i>
                    <span className="pl-2">Persons</span>
                </ReactBootstrap.Button>
            </ReactBootstrap.Row>
            <ReactBootstrap.Row className="mt-2">
                <ReactBootstrap.Col className="col-md-8 pt-1">
                    <TodoTable 
                    tabelData = {state.tabelData}
                    tableActions = {tableActions}/>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col className="col-md-4 pt-1">
                    <TodoForm
                        formData = {state.formData}
                        tableData = {state.tabelData}
                        formSubmit = {(e) => formSubmit(e)}/>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            {PersonPopUp()}
        </ReactBootstrap.Container>
    )
}
export default MainPage;
import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoTable from './TodoTable';
import CreatePerson from './CreatePerson';
import * as ReactBootstrap from 'react-bootstrap';
import { SearchFilter } from '../../common/searchFilter';
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
    const [searchState, setSearchState] = useState({
        title: '',
        person: '',
        description: '',
        startDate: '',
        endDate: '',
    });
    const [overViewState, setoverViewState] = useState({
        todoAction: 'create',
        todos: [],
        count: 0,
        active:1,
        page:5,
        tableItems:[]
    });
    const [personState, setPersonState] = useState({
        showPopUp: false
    })
    const createNewTodo = async() => {
        let {title, person, description, startDate, endDate} = formstate;
        let {todos} = overViewState;
        let finalData = 
        {    'id': await Math.random(),
            'title': title,
            'person': person,
            'description': description,
            'startDate': startDate,
            'endDate': endDate,
    };
        // console.log(Object.entries(finalData));
        await setoverViewState({
            ...overViewState,
            todos:[...todos,finalData]
        })
    }
    const openPersonPopUp = () => {

    }
    const formtodoAction = () => {
        switch (overViewState.todoAction) {
            case "create":
                createNewTodo();
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
        console.log(overViewState);
        let uniqTitles = overViewState.todos.length>0 ? overViewState.todos.map(value=>{return value.title}) :[];
        if (! formstate.title.trim()) {
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
        } else if(! formstate.description.trim()) {
            await commonFormState(
                setErrorState,
                errorState,
                '',
                errorState.person,
                'Description is mandatory', 
                errorState.startDate, 
                errorState.endDate
            )
            return 
        } else if(! formstate.person.trim()) {
            await commonFormState(
                setErrorState, errorState, '', 'Person is mandatory','', errorState.startDate, errorState.endDate
            )
            return 
        } else if (! formstate.startDate || !formstate.endDate) {
            await commonFormState(
                setErrorState,
                errorState,
                '',
                '',
                '', 
                ! errorState.startDate ? "StartDate is mandatory" : errorState.startDate,
                ! errorState.endDate ? "EndDate is mandatory" : errorState.endDate,   
            )
            return 
        } else if(formstate.startDate > formstate.endDate) {
            await commonFormState(
                setErrorState, errorState, '', '', '', "please select correct date", "please select correct date" 
            )
            return 
        }else if(
            (overViewState.todoAction === 'create' && uniqTitles.includes(formstate.title.trim())) ||
            overViewState.todoAction !== 'create' && uniqTitles.includes(formstate.title.trim()).length > 1
            ) {
            await commonFormState(
                setErrorState, errorState, "Please enter unique title", "", "", "", ""   
            )
            return 
        }
       return true;
    }
    const showHidePersonPopUp = () =>{
        setPersonState({
            ...personState,
            showPopUp:!personState.showPopUp
        });
    }
    const onChangeTitile = (e) =>{
        commonFormState(
            setFormState,
            formstate,
            e.target.value,
            formstate.person,
            formstate.description, 
            formstate.startDate, 
            formstate.endDate
        )
    }
    const onChangeDescription =(e)=>{
        commonFormState(
            setFormState,
            formstate,
            formstate.title,
            formstate.person,
            e.target.value, 
            formstate.startDate, 
            formstate.endDate
        )
    }
    const onChangeStartDate = (e) =>{
        commonFormState(
            setFormState,
            formstate,
            formstate.title,
            formstate.person,
            formstate.description,
            e.target.value, 
            formstate.endDate
        )
    }
    const onChangeEndDate = (e) =>{
        commonFormState(
            setFormState,
            formstate,
            formstate.title,
            formstate.person,
            formstate.description,
            formstate.startDate,
            e.target.value, 
        )
    }
    const onChangePersons =(e) =>{
        commonFormState(
            setFormState,
            formstate,
            formstate.title,
            e.target.value, 
            formstate.description,
            formstate.startDate,
            formstate.endDate,
        )
    }
    const formSubmit = async () =>{
        if (await validations()) { 
            await formtodoAction();
            await formReset()
        }
    }

    const formReset =async () =>{
        await commonFormState(setErrorState, errorState, '', '', '', '', ''); //reset all error values
        await commonFormState(setFormState, formstate, '', '', '', '', '');  //reset all form values
    }

    const TableActions = async(action, data) =>{
        let {todos} = overViewState;
        let latestTodo = [];
        if (action === 'edit') {
           await commonFormState(setFormState, formstate, data.title, data.person, data.description, data.startDate, data.endDate); 
        } else if (action === 'delete') {
            latestTodo = todos.filter(value=>{return value.id !== data.id});
        } else if (action === 'clone') {
            data.id = Math.random();
            latestTodo = todos.push(data);
        }
        await setoverViewState({
            ...overViewState,
            todos:[...latestTodo]
        })
    }
    const searchFilter = async (e) => {
        const { name, value } = e.target;
        if (e.key !== "Delete" || e.key !== "Backspace") {
            await searchData(name, value);
            await setSearchState({
                ...searchState,
                [name]: value
            })
        }
    }
    const onKeyUp = async (e) => {
        if (e.key === "Delete" || e.key === "Backspace") {
            await searchData();
        }
    }
    const searchData = async (name = '', value = '') => {
        const { todos,page ,tableItems} = overViewState;
        let searchResult = await SearchFilter.searchData(name, value, page, todos, searchState);
        await setoverViewState({
            ...overViewState,
            tableItems: searchResult['tableData'],
            active: 1,
            count: searchResult['count'],
            searchTask: searchResult['result']
        })
    }
    
    const PersonPopUp = () => {
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
            <ReactBootstrap.Row>
                <ReactBootstrap.Button className="col-md-2 m-2 btn-light"  onClick={(e)=>formtodoAction,0}>
                    <i class="fas fa-plus-circle"></i><span className="ml-2">New Todo</span></ReactBootstrap.Button>
                <ReactBootstrap.Button className="col-md-2 m-2 btn-warning" onClick={(e)=>showHidePersonPopUp()}>
                    <i class="fas fa-users"></i><span className="pl-2">Persons</span></ReactBootstrap.Button>
            </ReactBootstrap.Row>
            <ReactBootstrap.Row className="mt-2">
                <ReactBootstrap.Col className="col-md-8 pt-1">
                    <TodoTable 
                    tabelData={overViewState} 
                    FormtodoAction={formtodoAction} 
                    searchState={searchState}
                    searchFilter={(e)=>searchFilter(e)}
                    onKeyUp={(e)=>onKeyUp(e)}/>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col className="col-md-4 pt-1">
                    <TodoForm
                        formData={formstate}
                        error={errorState}
                        onChangeTitile={(e)=>onChangeTitile(e)}
                        onChangeDescription={(e)=>onChangeDescription(e)}
                        onChangeStartDate={(e)=>onChangeStartDate(e)}
                        onChangeEndDate={(e)=>onChangeEndDate(e)}
                        onChangePersons={(e)=>onChangePersons(e)}
                        formSubmit={(e)=>formSubmit(e)}
                        formReset={(e)=>formReset(e)} />
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            {PersonPopUp()}
        </ReactBootstrap.Container>
    )
}
export default MainPage;
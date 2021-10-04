import React, { useEffect, useState, useRef, useCallback, useMemo} from "react";
import * as ReactBootstrap from 'react-bootstrap';
import Paginator from "../../common/paginator";
import { SearchFilter } from '../../common/searchFilter';
import debounce from 'lodash.debounce';

const TodoTable = (props) => {
    const [state, setState] = useState({
        active: 1,
        rows: 5,
        tablePagesCount : 0,
        tableData: [],
        filteredtableData: []
    })

    const title = useRef('');
    const person = useRef('');
    const startDate = useRef('');
    const endDate = useRef('');

    const searchFilter = async (activePageNumber = state.active) =>{
        let searchStates = {
            title: title.current.value,
            person: person.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
        }
        
        let searchResult = await SearchFilter.searchData(
            props.tabelData,
            searchStates,
            state.rows,
            activePageNumber
            );

        await setState({
            ...state,
            filteredtableData: searchResult['tableData'],
            tablePagesCount: searchResult['count'],
            active: activePageNumber
        })
    }

    const changePage = (page) =>{
        searchFilter(page)
    }

    useEffect(() => searchFilter(), []);

    const DebounceOnchange = useCallback(debounce(searchFilter,100), []);

    useEffect(() => searchFilter(), [props]);
    
    return (
        <ReactBootstrap.Card className="overView">
            <ReactBootstrap.Card.Header>
                <ReactBootstrap.Card.Title className="text-center">Todo Overview</ReactBootstrap.Card.Title>
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
                            <th>
                                <ReactBootstrap.FormControl
                                    type="search"
                                    name="title"
                                    ref={title}
                                    onChange={(e) => DebounceOnchange()} />
                            </th>
                            <th>
                                <ReactBootstrap.FormControl
                                    type="search"
                                    placeholder="Search"
                                    name="person"
                                    ref={person}
                                    onChange={(e) => DebounceOnchange()}/>
                            </th>
                            <th>
                                <ReactBootstrap.FormControl
                                    type="search"
                                    placeholder="Search"
                                    name="startDate"
                                    ref={startDate}
                                    onChange={(e) => DebounceOnchange()}/>
                            </th>
                            <th>
                                <ReactBootstrap.FormControl
                                    type="text"
                                    placeholder="Search"
                                    name="endDate"
                                    ref={endDate}
                                    onChange={(e) => DebounceOnchange()} />
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.filteredtableData && state.filteredtableData.map((value, index) => {
                            return <tr key={index}>
                                <td>{value.title}</td>
                                <td>{value.person}</td>
                                <td>{value.startDate}</td>
                                <td>{value.endDate}</td>
                                <td className="d-flex justify-content-center">
                                    <div
                                        className="p-1"
                                        onClick={(e) => props.tableActions(value, 'edit')}>
                                        <i class="fas fa-edit" title="Edit"></i>
                                    </div>
                                    <div
                                        className="p-1"
                                        onClick={(e) => props.tableActions(value, 'clone')}>
                                        <i class="far fa-copy" title="Clone"></i>
                                    </div>
                                    <div
                                        className="p-1"
                                        onClick={(e) => props.tableActions(value, 'delete')}>
                                        <i class="fas fa-trash-alt" title="Delete"></i>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </ReactBootstrap.Table>
            </ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Footer className="d-flex justify-content-center  border-top-0 pt-3">
                <Paginator 
                count={state.tablePagesCount}
                active={state.active} 
                changePage={changePage}
                size="md"/>
            </ReactBootstrap.Card.Footer>
        </ReactBootstrap.Card>
    )
}

export default TodoTable
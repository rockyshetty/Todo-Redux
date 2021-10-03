import React, { useEffect, useState, useRef } from "react";
import * as ReactBootstrap from 'react-bootstrap';
import Paginator from "../../common/paginator";
import { SearchFilter } from '../../common/searchFilter';

const TodoTable = (props) => {
    const [state, setState] = useState({
        paginationActive: 1,
        paginationPagesCount: 0,
        paginationRowsCount: 5,
        tableData: [],
        filteredtableData: []
    })

    const title = useRef();
    const person = useRef();
    const startDate = useRef();
    const endDate = useRef();

    useEffect(() => {
        searchFilter();
    }, [])

    useEffect(async() => {
       await searchFilter();
    }, [props])

    const searchFilter = async () =>{
        let searchStates = {
            title: title.current.value,
            person: person.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
        }
        
        let searchResult = await SearchFilter.searchData(
            '',
            '',
            state.paginationRowsCount,
            state.tableData,
            searchStates);

        await setState({
            ...state,
            tabelData: props.tabelData,
            filteredtableData: searchResult['tableData'],
            paginationPagesCount: searchResult['count'],
            paginationActive: 1,
        })
    }

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
                                    placeholder="Search"
                                    name="title"
                                    ref={title}
                                    onChange={(e) => searchFilter()}
                                    onKeyUp={(e) => searchFilter()} />
                            </th>
                            <th>
                                <ReactBootstrap.FormControl
                                    type="search"
                                    placeholder="Search"
                                    name="person"
                                    ref={person}
                                    onChange={(e) => searchFilter()}
                                    onKeyUp={(e) => searchFilter()} />
                            </th>
                            <th>
                                <ReactBootstrap.FormControl
                                    type="search"
                                    placeholder="Search"
                                    name="startDate"
                                    ref={startDate}
                                    onChange={(e) => searchFilter()}
                                    onKeyUp={(e) => searchFilter()} />
                            </th>
                            <th>
                                <ReactBootstrap.FormControl
                                    type="text"
                                    placeholder="Search"
                                    name="endDate"
                                    ref={endDate}
                                    onChange={(e) => searchFilter()}
                                    onKeyUp={(e) => searchFilter()} />
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.tabelData.map((value, index) => {
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
                <Paginator count={state.paginationPagesCount} active={state.paginationActive}  size="md"/>
            </ReactBootstrap.Card.Footer>
        </ReactBootstrap.Card>
    )
}

export default TodoTable
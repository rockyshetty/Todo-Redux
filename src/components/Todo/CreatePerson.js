import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {addPersons, removePersons, editPersons} from '../../app/todoPersonSlice'
import * as ReactBootstrap from 'react-bootstrap';

const CreatePerson = () =>{
    const PersonsList = useSelector((state) => state.persons.value);
    const dispatch = useDispatch();
    const [person, setPerson] = useState({
        name: '',
        action: 'create',
        editablePersonName: ''
    });

    const personOnChange =(e) =>{
        setPerson({
            ...person,
            name: e.target.value
        })
    }

    const AddNewPerson = () => {
        let personName = person.name ? person.name.trim() : '';
        if (personName && ! PersonsList.includes(personName)) {
            dispatch(addPersons(personName));
            ResetData();
        }
    }

    const EditPerson = (value) =>{
        setPerson({
            ...person,
            name: value,
            action: 'edit',
            editablePersonName: value
        });
    }
    const ResetData = () =>{
        setPerson({
            ...person,
            name: '',
            action: 'create',
            editablePersonName: ''
        });
    }
    const submitEditPerson = () =>{
        let personName = person.name ? person.name.trim() : '';
        if (personName && ! PersonsList.includes(personName)) {
        dispatch(editPersons({oldName:person.editablePersonName,newName:person.name}));
        ResetData();
        }
    }
    return (
        <ReactBootstrap.Container>
           <ReactBootstrap.Row>
               <ReactBootstrap.Col className="col-md-8">
               <ReactBootstrap.FormControl type="text" value={person.name} onChange={(e)=>personOnChange(e)}></ReactBootstrap.FormControl>
               </ReactBootstrap.Col>
               <ReactBootstrap.Col className="col-md-4">
               {person.action === "create" && <ReactBootstrap.Button className="m-1" onClick={(e)=>AddNewPerson()}>
               Add Person <span class="fas fa-plus-circle pl-1"></span></ReactBootstrap.Button>}
                {person.action === "edit" && <ReactBootstrap.Button className="m-1" onClick={(e)=>submitEditPerson()}>
                Edit Person <span class="fas fa-pencil-alt"></span>
                </ReactBootstrap.Button>}
                <ReactBootstrap.Button onClick={(e) => ResetData()}>Reset <span class="fas fa-sync-alt"></span></ReactBootstrap.Button>
               </ReactBootstrap.Col>
           </ReactBootstrap.Row>
           <ReactBootstrap.Row>
               <table className="col-md-12">
                   <thead>
                       <tr className="col-md-12">
                       <th className="col-md-6 text-right">Name</th>
                       <th className="col-md-6 text-center">Action</th>
                       </tr>
                   </thead>
                   <tbody>
                   {PersonsList.map(value =>{
                      return <tr className="col-md-12">
                          <td className="text-right">{value}</td>
                          <td className="text-center">
                              <span onClick={(e) => EditPerson(value)}><i class="fas fa-edit m-2"  title="Edit Person"></i></span>
                              <span  onClick={(e) => dispatch(removePersons(value))}><i class="fas fa-trash-alt m-2" title="Remove Person"></i></span>
                           </td>
                      </tr>
                   })}
                   </tbody>
               </table>
           </ReactBootstrap.Row>
        </ReactBootstrap.Container>
    )
}
export default CreatePerson;
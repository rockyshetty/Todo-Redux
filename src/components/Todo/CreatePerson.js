import React, {useRef, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {addPersons, removePersons, editPersons} from '../../app/todoPersonSlice'
import * as ReactBootstrap from 'react-bootstrap';

const CreatePerson = () =>{
    const PersonsList = useSelector((state) => state.persons.value);
    const personName = useRef('');
    const dispatch = useDispatch();
    const [person, setPerson] = useState({
        action: 'create',
        editablePerson: ''
    });

    const AddNewPerson = () => {
        if (Object.values(PersonsList).includes(personName.current.value)) {
            dispatch(addPersons(personName.current.value));
            ResetData();
        }
    }

    const EditPerson = (value) =>{
        personName.current.value = Object.values(value)[0];
        setPerson({
            ...person,
            action: 'edit',
            editablePerson: value
        });
    }

    const ResetData = () =>{
        personName.current.value = '';
        setPerson({
            ...person,
            action: 'create',
            editablePerson: ''
        });
    }

    const submitEditPerson = () =>{
        if (! Object.values(PersonsList).includes(personName.current.value)) {
        dispatch(editPersons({[Object.keys(person.editablePerson)[0]] : personName.current.value}));
        ResetData();
        }
    }

    return (
        <ReactBootstrap.Container>
           <ReactBootstrap.Row>
               <ReactBootstrap.Col className="col-md-8">
               <ReactBootstrap.FormControl type="text" ref={personName}></ReactBootstrap.FormControl>
               </ReactBootstrap.Col>
               <ReactBootstrap.Col className="col-md-4">
               {person.action === "create" 
                ? <ReactBootstrap.Button className="m-1" onClick={(e) => AddNewPerson()}>
                  Add Person<span class="fas fa-plus-circle pl-1"></span>
                  </ReactBootstrap.Button>
                : <ReactBootstrap.Button className="m-1" onClick={(e) => submitEditPerson()}>
                Edit Person<span class="fas fa-pencil-alt"></span>
                </ReactBootstrap.Button>}
                <ReactBootstrap.Button onClick={(e) => ResetData()}>
                    Reset<span class="fas fa-sync-alt"></span>
                </ReactBootstrap.Button>
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
                   {Object.entries(PersonsList).map((value, key) =>{
                      return <tr className="col-md-12">
                          <td className="text-right">{value}</td>
                          <td className="text-center">
                              <span onClick={(e) => EditPerson({[key]: value})}>
                                  <i class="fas fa-edit m-2"  title="Edit Person"></i>
                              </span>
                              <span onClick={(e) => dispatch(removePersons({[key]: value}))}>
                                  <i class="fas fa-trash-alt m-2" title="Remove Person"></i>
                              </span>
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
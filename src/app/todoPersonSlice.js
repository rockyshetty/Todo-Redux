import { createSlice } from '@reduxjs/toolkit'
export const personSlice = createSlice({
  name: "persons",
  initialState: {
      value : {1:'rakesh',2:'SHETTY'}
  },
  reducers: {
      addPersons: (state, action) => {
        state.value[getRandomKeyforPerson(state.value)] = action.payload;
      },
      removePersons: (state, action) => {
        delete state.value[Object.keys(action.payload)[0]];
      },
      editPersons: (state, action) => {
        state.value[Object.keys(action.payload)[0]] = Object.values(action.payload)[0];
      }
  }
})

const getRandomKeyforPerson = (persons) => {
  let uniqId = Math.floor(Math.random() * (10000 + 1 -1) + 1);
  if(! Object.keys(persons).includes(uniqId)) {
    return uniqId;
  }
  getRandomKeyforPerson();
}

export const { addPersons, removePersons, editPersons} = personSlice.actions
export default personSlice.reducer
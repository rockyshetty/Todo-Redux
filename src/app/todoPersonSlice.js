import { createSlice } from '@reduxjs/toolkit'
export const personSlice = createSlice({
  name: "persons",
  initialState: {
      value : ['rakesh']
  },
  reducers: {
      addPersons: (state, action) => {
          state.value.push(action.payload);
      },
      removePersons: (state, action) => {
        state.value = state.value.filter(item=> item !==action.payload);
      },
      editPersons: (state, action) => {
        state.value[state.value.indexOf(action.payload.oldName)] = action.payload.newName;
      }
  }
})

export const { addPersons, removePersons, editPersons} = personSlice.actions
export default personSlice.reducer
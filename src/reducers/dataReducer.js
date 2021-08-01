import { createSlice } from '@reduxjs/toolkit'
import { InsertData, DeleteData, updateData } from '../shared/database';

export const dataSlice = createSlice({
  name: 'appData',
  initialState: { 
    data: {}
  },
  reducers: {
    dataInit: (state, action) => {
        // console.log(action.payload)
        const type = action.payload.type;
        state.data[type] = []
        action.payload.data.map((data) => {
            state.data[type].push(data);
        })
    },
    dataAdded: (state, action) => {
        const type = action.payload.type;
        let newId = 1;
        if (state.data[type].length > 0){
          newId = state.data[type][state.data[type].length - 1].id + 1;
        }
        InsertData(type, {id: newId, ...action.payload.data});
        state.data[type].push({id: newId, ...action.payload.data});

    },
    dataDelete: (state, action) => {
        DeleteData(action.payload);

        if (state.data.length > 0) {
            let newList = state.data.filter(data => {
                if (data.id === action.payload)
                  return false
                else
                  return true
            })
        state.data = newList;
        }
    },
    dataUpdate: (state, action) => {
        updateData(action.payload);

        if (state.data.length > 0) {
            let newList = state.data.map(data => {
              if (data.id === action.payload.id)
                return action.payload
              else
                return data
            })
        state.data = newList;
        }
    }
}})

export const { dataAdded, dataInit, dataDelete, dataUpdate } = dataSlice.actions
export const selectData = state => state.appData.data;
export default dataSlice.reducer

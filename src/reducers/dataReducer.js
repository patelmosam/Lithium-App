import { createSlice } from '@reduxjs/toolkit'
import { InsertData, DeleteData, updateData } from '../shared/database';
import { DB_PATH } from './fieldReducer';

export const dataSlice = createSlice({
  name: 'appData',
  initialState: { 
    data: {}
  },
  reducers: {
    dataInit: (state, action) => {
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
        InsertData(DB_PATH, type, {id: newId, ...action.payload.data});
        state.data[type].push({id: newId, ...action.payload.data});

    },
    dataDelete: (state, action) => {
        DeleteData(DB_PATH, action.payload.type, action.payload.id);

        const type = action.payload.type;
        if (state.data[type].length > 0) {
            let newList = state.data[type].filter(data => {
                if (data.id === action.payload.id)
                  return false
                else
                  return true
            })
        state.data[type] = newList;
        }
    },
    dataUpdate: (state, action) => {
        updateData(DB_PATH, action.payload.type, action.payload.data);
        const type = action.payload.type;
        if (state.data[type].length > 0) {
            let newList = state.data[type].map(data => {
              if (data.id === action.payload.data.id)
                return action.payload.data
              else
                return data
            })
        state.data[type] = newList;
        }
    }
}})

export const { dataAdded, dataInit, dataDelete, dataUpdate } = dataSlice.actions
export const selectData = state => state.appData.data;
export default dataSlice.reducer

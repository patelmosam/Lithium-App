import { createSlice } from '@reduxjs/toolkit'
import { InsertData, DeleteData, updateData } from '../shared/database';

export const dataSlice = createSlice({
  name: 'appData',
  initialState: { 
    data: {}
  },
  reducers: {
    dataInit: (state, action) => {
        
        const table = action.payload.table;
        const db = action.payload.db;
        if (state.data[db] == undefined)
          state.data[db] = {};
        state.data[db][table] = [];
        action.payload.data.map((data) => {
            state.data[db][table].push(data);
        })
    },
    dataAdded: (state, action) => {
        const table = action.payload.table;
        const db = action.payload.db;
       
        let newId = 1;
        if (state.data[db][table].length > 0){
          newId = state.data[db][table][state.data[db][table].length - 1].id + 1;
        }
        action.payload.data.id = newId;
        let newData = action.payload.data;
        InsertData(db, table, newData);
        state.data[db][table].push(newData);
    },
    dataDelete: (state, action) => {
        const table = action.payload.table;
        const db = action.payload.db;
        DeleteData(db, table, action.payload.id);

        if (state.data[db][table].length > 0) {
            let newList = state.data[db][table].filter(data => {
                if (data.id === action.payload.id)
                  return false
                else
                  return true
            })
        state.data[db][table] = newList;
        }
    },
    dataUpdate: (state, action) => {
        const table = action.payload.table;
        const db = action.payload.db;
        updateData(db, table, action.payload.data);

        if (state.data[db][table].length > 0) {
            let newList = state.data[db][table].map(data => {
              if (data.id === action.payload.data.id)
                return action.payload.data
              else
                return data
            })
        state.data[db][table] = newList;
        }
    }
}})

export const { dataAdded, dataInit, dataDelete, dataUpdate } = dataSlice.actions
export const selectData = state => state.appData.data;
export default dataSlice.reducer

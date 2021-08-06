import { createSlice } from '@reduxjs/toolkit'
// import { SettingsStackScreen } from '../navigation/StackNavigator';
import { InitTable, InsertInfo, DeleteTable, DeleteData } from '../shared/database';

export const DB_PATH = 'default.db';

export const fieldSlice = createSlice({
    name: 'fields',
    initialState: {
        fieldList: []
        // dBList: []
    },
    reducers: {
        InitFields : (state, action) => {
          // console.log('paylod', action.payload);
          state.fieldList = []
          action.payload.data.map((field) => {
              field.schema = JSON.parse(field.schema);
              field.fieldOrder = Object.keys(field.schema);
              state.fieldList.push(field);
          })
          
          const dublicateName = state.fieldList.map((field) => field.name)

          const newList = action.payload.default.filter((field) => !dublicateName.includes(field.name))
          // console.log(newList);
          let newKey = 1;
          if (state.fieldList.length > 0){
            newKey = state.fieldList[state.fieldList.length - 1].id + 1;
          }
           
          newList.map((field) => {
            state.fieldList.push({...field, id: newKey++});
            InsertInfo(DB_PATH, field);
          });
        },

        AddField: (state, action) => {
                   
            InitTable(DB_PATH, action.payload.name, action.payload.schema);

            InsertInfo(DB_PATH, action.payload);
           
            let newKey = 1;
            if (state.fieldList.length > 0){
              newKey = state.fieldList[state.fieldList.length - 1].id + 1;
            }
            state.fieldList.push({...action.payload, id: newKey});
          
        },
        
        DeleteField: (state, action) => {
            DeleteTable(DB_PATH, action.payload.table);
            DeleteData(DB_PATH, 'TablesInfo', action.payload.id);

            let newList = state.fieldList.filter((field) => {
              if(field.name == action.payload.table){
                return false
              }
              else
                return true
            });
            
            state.fieldList = newList;
        }
    }
})

export const { AddField, InitFields, DeleteField } = fieldSlice.actions
export const selectFields = state => state.fields.fieldList;
// export const selectDBList = state => state.fields.dBList;
export default fieldSlice.reducer
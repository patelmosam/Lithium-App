import { createSlice } from '@reduxjs/toolkit'
// import { SettingsStackScreen } from '../navigation/StackNavigator';
import { InitTable, InsertInfo } from '../shared/database';

export const fieldSlice = createSlice({
    name: 'fields',
    initialState: {
        fieldList: []
    },
    reducers: {
        InitFields : (state, action) => {
          // console.log('paylod', action.payload.data);
          state.fieldList = []
          action.payload.data.map((field) => {
              field.schema = JSON.parse(field.schema);
              field.fieldOrder = Object.keys(field.schema);
              state.fieldList.push(field);
          })
          
          const dublicateName = state.fieldList.map((field) => field.name)

          const newList = action.payload.default.filter((field) => !dublicateName.includes(field.name))
          console.log(newList);
          let newKey = 1;
          if (state.fieldList.length > 0){
            newKey = state.fieldList[state.fieldList.length - 1].id + 1;
          }
           
          newList.map((field) => {
            state.fieldList.push({...field, id: newKey++});
            InsertInfo(field);
          });
        },

        AddField: (state, action) => {
                   
            InitTable(action.payload.name, action.payload.schema);

            InsertInfo(action.payload);
           
            let newKey = 1;
            if (state.fieldList.length > 0){
              newKey = state.fieldList[state.fieldList.length - 1].id + 1;
            }
            state.fieldList.push({...action.payload, id: newKey});
          
        }
    }
})

export const { AddField, InitFields } = fieldSlice.actions
export const selectFields = state => state.fields.fieldList;
export default fieldSlice.reducer
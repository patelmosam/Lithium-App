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
          // console.log(action.payload);
          state.fieldList = []
          action.payload.map((field) => {
              field.schema = JSON.parse(field.schema);
              state.fieldList.push(field);
          })
        },

        AddField: (state, action) => {
          // console.log(action.payload);
          InitTable(action.payload.name, action.payload.schema);

          InsertInfo(action.payload);

          let newKey = 1;
          if (state.fieldList.length > 0){
            newKey = state.fieldList[state.fieldList.length - 1].id + 1;
          }
          // state.fieldList.push({...action.payload, key: newKey});
          // action.payload[0] = newKey;
          state.fieldList.push({...action.payload, id: newKey});
        }
    }
})

export const { AddField, InitFields } = fieldSlice.actions
export const selectFields = state => state.fields.fieldList;
export default fieldSlice.reducer
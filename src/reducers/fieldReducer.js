import { createSlice } from '@reduxjs/toolkit'
import { SettingsStackScreen } from '../navigation/StackNavigator';

export const fieldSlice = createSlice({
    name: 'fields',
    initialState: {
        fieldList: [
            { key: 1,
              screenName: 'screen1',
              screenPage: null},
            ]
    },
    reducers: {
        AddField: (state, action) => {

        }
    }
})

export const { AddField } = fieldSlice.actions
export const selectFields = state => state.fields.fieldList;
export default fieldSlice.reducer
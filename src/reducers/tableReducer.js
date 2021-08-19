import { createSlice } from '@reduxjs/toolkit'
// import { SettingsStackScreen } from '../navigation/StackNavigator';
import { InitDB, InitTable, InsertInfo, deleteTable, getTablesInfo } from '../shared/database';
import { parse_sql } from '../shared/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DB_PATH = 'default.db';

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        // console.log(jsonValue)
      await AsyncStorage.setItem('DBNameList', jsonValue)
    } catch (e) {
      console.log('error storing value',e)
    }
  }

export const tableSlice = createSlice({
    name: 'tables',
    initialState: {
        dBList: {}
    },
    reducers: {
        newDB: (state, action) => {
            const dBName = action.payload.dBName;
            // console.log(dBName)
            InitDB(dBName);
            state.dBList[dBName] = {};
            storeData(Object.keys(state.dBList));
        },
        deleteDB: (state, action) => {
            const dBName = action.payload.dBName;
            // console.log(dBName);
            Object.keys(state.dBList[dBName]).map((table) => {
                deleteTable(dBName, table);
            })
            delete state.dBList[dBName];
            storeData(Object.keys(state.dBList));

        },
        InitTables : (state, action) => {
            const dBName = action.payload.dBName;
            state.dBList[dBName] = {};
            action.payload.data.map((field) => {
                if(field.tbl_name != 'android_metadata' && field.tbl_name != 'sqlite_sequence')
                    state.dBList[dBName][field.tbl_name] = parse_sql(field.sql);
                // getTablesInfo(dBName, field.tbl_name);
            });

        },

        AddTable: (state, action) => {
            const dBName = action.payload.dBName;
            const table = action.payload.table;
            const schema = action.payload.schema;
            let newSchema = {id: 'INTEGER', ...schema};
            // console.log(newSchema);
            if (state.dBList[dBName][table] == undefined){
                InitTable(dBName, table, schema);
                state.dBList[dBName][table] = newSchema;
            }
        },
        
        DeleteTable: (state, action) => {
            const dBName = action.payload.dBName;
            const table = action.payload.table;
            deleteTable(dBName, table);

            delete state.dBList[dBName][table];
        }
    }
})

export const { AddTable, InitTables, DeleteTable, newDB, deleteDB } = tableSlice.actions
export const selectTables = state => state.tables.dBList;
export default tableSlice.reducer
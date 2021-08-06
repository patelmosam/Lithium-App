import React, {useState, useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/CustomSidebar';
import { HomeStackScreen, newFieldStackScreen, GeneralStackScreen, SettingsStackScreen } from './StackNavigator';
import { useSelector, useDispatch } from 'react-redux'
import { selectFields } from '../reducers/fieldReducer';
// import { dataAdded, datasInit, selectData } from '../reducers/dataReducer';
import { InitFields, AddField } from '../reducers/fieldReducer';
import * as SQLite from 'expo-sqlite';
import { InitDB, InitTable } from '../shared/database';

const Drawer = createDrawerNavigator();
const DB_PATH = 'default.db';

export default function DrawerNavigator(){
    const screens = useSelector(selectFields)
    const dispatch = useDispatch()
    

    const defaultFields = [
        {name:'Contacts',
        schema: {name: 'TEXT', surname: 'TEXT', phone_no: 'INTEGER', gender: 'TEXT', discription: 'TEXT'},
        fieldOrder: ['name', 'surname', 'phone_no', 'gender', 'discription']},
    ];

    const InitTables = (defaultTables) => {
        const db = SQLite.openDatabase(DB_PATH);
        db.transaction(tx => {
        tx.executeSql('SELECT * FROM TablesInfo', null, 
            (txObj, { rows: { _array } }) =>  dispatch(InitFields({data:_array, default: defaultTables}))  ,
            (txObj, error) => console.log('Error ', error)
            ) 
        })
    }

    const init = () => {
        const quary2 = 'CREATE TABLE IF NOT EXISTS TablesInfo (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, schema TEXT)';
        InitDB(DB_PATH, quary2);
        defaultFields.map((item) => InitTable(DB_PATH, item.name, item.schema));
        InitTables(defaultFields);    
    }

    useEffect(() => {
        init();      
      }, [])

    return (
        // <NavigationContainer theme={theme}>
            <Drawer.Navigator initialRouteName="HomeStack"
                drawerContent={(props) => <DrawerContent {...props} />}
            > 
                <Drawer.Screen 
                    name="HomeStack" 
                    component={HomeStackScreen} />
                
                <Drawer.Screen 
                    name="settings" 
                    component={SettingsStackScreen} />

                { screens.map((screen) => (
                    <Drawer.Screen
                        key={screen.id}
                        name={screen.name} 
                        component={GeneralStackScreen} />
                ))}
                
                <Drawer.Screen 
                    name="newFieldStack" 
                    component={newFieldStackScreen} />

            </Drawer.Navigator>
        // </NavigationContainer>
    )
}
import React, {useState, useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/CustomSidebar';
import { HomeStackScreen, newFieldStackScreen, 
        GeneralStackScreen, SettingsStackScreen, DatabaseStackScreen } from './StackNavigator';
import { useSelector, useDispatch } from 'react-redux'
import { selectTables, InitTables } from '../reducers/tableReducer';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){
    const [dBList, setDBList] = useState([]);
    const dispatch = useDispatch();
    const tables = useSelector(selectTables);
    
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('DBNameList');
            setDBList(JSON.parse(jsonValue));
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log('error');
        }
    }
  
    const getTablesInfo = (db_path) => {
        const quary = "SELECT * FROM sqlite_master WHERE type='table'";
        const db = SQLite.openDatabase(db_path);
        db.transaction(tx => (
          tx.executeSql(quary, null, 
            (txObj, { rows: { _array } }) =>  dispatch(InitTables({dBName:db_path, data:_array})),
            (txObj, error) => console.log('Error ', error)
            ) 
        ));
    }

    const setDB = () => {
        dBList.map((key) => {
            getTablesInfo(key);
        });
    }

    useEffect(() => {
        let DBNameList = getData(); 
      }, []);

    useEffect(() => {
        setDB();
    }, [dBList]);

    return (
            <Drawer.Navigator initialRouteName="HomeStack"
                drawerContent={(props) => <DrawerContent {...props} />}
            > 
                <Drawer.Screen 
                    name="HomeStack" 
                    component={HomeStackScreen} />
                
                <Drawer.Screen 
                    name="settings" 
                    component={SettingsStackScreen} />

                { Object.keys(tables).map((table) => (
                    Object.keys(tables[table]).map((name) => (
                        <Drawer.Screen
                            key={name}
                            name={name} 
                            component={GeneralStackScreen} />
                    ))
                ))}
                
                <Drawer.Screen 
                    name="newFieldStack" 
                    component={newFieldStackScreen} />

                <Drawer.Screen 
                    name="DatabaseStack" 
                    component={DatabaseStackScreen} />

            </Drawer.Navigator>
    )
}
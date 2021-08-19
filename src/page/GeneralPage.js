import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import FABGroup from '../components/FAB';
import { useTheme, useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { selectData, dataInit } from '../reducers/dataReducer';
import { selectTables, DB_PATH } from '../reducers/tableReducer';


export default function GeneralScreen({ navigation }) {

  const { colors } = useTheme();
  const theme = useTheme();
  const route = useRoute();
  const [appData, setAppData] = useState([]);
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState(null);
  const [dbName, setdbName] = useState('');
  const tables = useSelector(selectTables);
  const data = useSelector(selectData);

    const fetchData = (table, dbName) => {
      const db = SQLite.openDatabase(dbName);
      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM "${table}"`, null, 
          (txObj, { rows: { _array } }) =>  dispatch(dataInit({data:_array, table:table, db:dbName}))  ,
          (txObj, error) => console.log('Error ', error)
          ) 
      })
    }

    const getData  = async (db, table) => {
      try{
        let info = await data[db][table];
        setAppData(info);

      }catch(err){
        console.log('errer', db, table);
      }
    }

    const Init = () => {
        
        for (let table in tables) {
          Object.keys(tables[table]).map((key) => {
            if (key == route.name){
              setItemName(Object.keys(tables[table][key]));
              fetchData(route.name, table);
              setdbName(table);
            }
          })
        };
    }

    useEffect(() => {
        Init();
    }, [])

    useEffect(() => {
      getData(dbName, route.name);
    }, [data])
  return (
     
      <View style={styles.container}>
       <ScrollView style={styles.scrollStyle} >
       
       { appData && appData.map((data) => (
         itemName == null ? <View key={data.id}></View> :
         <TouchableWithoutFeedback key={data.id} onPress={() => navigation.navigate('GenItemScreen', {data:data, tableName:route.name, col:itemName, dbName:dbName})}>
          <View  style={styles.itemStyle}>
            <Text style={styles.TextStyle}>{data[itemName[1]]}</Text>
          </View>
         </TouchableWithoutFeedback>
       ))}
        </ScrollView>
          <FABGroup navigation={navigation} screenName="GenAddScreen" tableName={route.name} dbName={dbName}/>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  scrollStyle: {
    alignSelf: 'flex-start',
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  TextStyle: {
    color: '#fff',
    fontSize: 16,
  },  
  itemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#222',
    padding: 10,
    marginBottom: 5,
  }
});

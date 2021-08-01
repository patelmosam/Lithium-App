import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import FABGroup from '../components/FAB';
import { useTheme, useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
// import { InitDB } from '../shared/database';
// import { GenAddEntryScreen } from './GenAddPage';
import { selectData, dataInit } from '../reducers/dataReducer';
import { useIsFocused } from "@react-navigation/native";


export default function GeneralScreen({ navigation, name }) {

  const { colors } = useTheme();
  const theme = useTheme();
  const route = useRoute();
  // const [state, setState] = useState({ data: null});
  const appData = useSelector(selectData);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

    const fetchData = (table) => {
      const db = SQLite.openDatabase('database3.db')
      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM ${table}`, null, 
          (txObj, { rows: { _array } }) =>  dispatch(dataInit({data:_array, type: table}))  ,
          (txObj, error) => console.log('Error ', error)
          ) 
      })
    }

    // const Init = () => {
    //     console.log(route.name)
    // }

    useEffect(() => {
        // Init();
        fetchData(route.name);
    }, [navigation.isFocused])

  return (
     
      <View style={styles.container}>
       <ScrollView style={styles.scrollStyle} >
         {/* {console.log(appData)} */}
       { appData[route.name] && appData[route.name].map((data) => (
         <View key={data.id}>
           <Text style={styles.TextStyle}>{JSON.stringify(data)}</Text>
         </View>
       ))}
        </ScrollView>
          <FABGroup navigation={navigation} screenName="GenAddEntryScreen" type={route.name}/>
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
});

import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Button,
  ScrollView, TouchableWithoutFeedback } from 'react-native';
// import { TouchableRipple } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { dataAdded, datasInit, selectData } from '../reducers/dataReducer';
import { InitFields, AddField } from '../reducers/fieldReducer';
import * as SQLite from 'expo-sqlite';
import ContactItem from '../components/ContactItem';
import { InitDB, InitTable } from '../shared/database';
import { useTheme } from '@react-navigation/native';

const db = SQLite.openDatabase('database3.db')

export default function HomeScreen({ navigation }) {

  const { colors } = useTheme();

  const theme = useTheme();

  const data = useSelector(selectData);
 
  const dispatch = useDispatch();

  const defaultFields = [
                        {name:'Contacts',
                        schema: {name: 'TEXT', surname: 'TEXT', phone_no: 'INTEGER', gender: 'TEXT', discription: 'TEXT'},
                        fieldOrder: ['name', 'surname', 'phone_no', 'gender', 'discription']},
                      ];

  const InitTables = (defaultTables) => {
    const db = SQLite.openDatabase('database3.db')
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM TablesInfo', null, 
        (txObj, { rows: { _array } }) =>  dispatch(InitFields({data:_array, default: defaultTables}))  ,
        (txObj, error) => console.log('Error ', error)
        ) 
    })
  }

  const init = () => {
    const quary2 = 'CREATE TABLE IF NOT EXISTS TablesInfo (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, schema TEXT)';
    InitDB(quary2);
    defaultFields.map((item) => InitTable(item.name, item.schema));
    InitTables(defaultFields);    
  }

    useEffect(() => {
      init();      
    }, [])

  return (
     
      <View style={styles.container}>
        {/* <Button title="Add" onPress={ () => dispatch(contactAdded(data))}/> */}
          {/* <ScrollView style={styles.scrollStyle} >
          { 
              contacts.map(data =>
              (
                <TouchableWithoutFeedback key={data.id} activeOpacity='0' onPress={() => navigation.navigate('ContactScreen', {data:data})}>
                  <View>
                  <ContactItem data={data}/>
                  </View>
                </TouchableWithoutFeedback>
              )
          )
        }
          </ScrollView> */}

          {/* <FABGroup navigation={navigation} screenName="AddEntryScreen"/> */}
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
  }  
});

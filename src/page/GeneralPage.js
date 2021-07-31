import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import FABGroup from '../components/FAB';
import { useTheme, useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
// import { InitDB } from '../shared/database';
// import { GenAddEntryScreen } from './GenAddPage';
import { selectContacts, contactsInit } from '../reducers/contactReducer';
import { useIsFocused } from "@react-navigation/native";


export default function GeneralScreen({ navigation, name }) {

  const { colors } = useTheme();
  const theme = useTheme();
  const route = useRoute();
  // const [state, setState] = useState({ data: null});
  const contacts = useSelector(selectContacts)
  const dispatch = useDispatch()
  const isFocused = useIsFocused();

    const fetchData = (table) => {
      const db = SQLite.openDatabase('database3.db')
      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM ${table}`, null, 
          (txObj, { rows: { _array } }) =>  dispatch(contactsInit(_array))  ,
          (txObj, error) => console.log('Error ', error)
          ) 
      })
    }

    const Init = () => {
        console.log(route.name)
    }

    useEffect(() => {
        Init();
        fetchData(route.name);
    }, [navigation.isFocused])

  return (
     
      <View style={styles.container}>
       <ScrollView style={styles.scrollStyle} >
       {contacts.map((contact) => (
         <View key={contact.id}>
           <Text style={styles.TextStyle}>{JSON.stringify(contact)}</Text>
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

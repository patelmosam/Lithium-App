import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Button,
  ScrollView, TouchableWithoutFeedback } from 'react-native';
// import { TouchableRipple } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { contactAdded, contactsInit, selectContacts } from '../reducers/contactReducer';
import * as SQLite from 'expo-sqlite';
import FABGroup from '../components/FAB';
// import CustomButton from '../components/CustomButton';
import ContactItem from '../components/ContactItem';
import { InitDB } from '../shared/database';
import { useTheme } from '@react-navigation/native';

const db = SQLite.openDatabase('database3.db')

export default function HomeScreen({ navigation }) {

  const { colors } = useTheme();

  const theme = useTheme();

  // const [state, setState] = useState({ data: null});
  const contacts = useSelector(selectContacts)
  const dispatch = useDispatch()


  fetchData = () => {
    const db = SQLite.openDatabase('database3.db')
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Contacts', null, 
        (txObj, { rows: { _array } }) =>  dispatch(contactsInit(_array))  ,
        (txObj, error) => console.log('Error ', error)
        ) 
    })
  }

    useEffect(() => {
      InitDB();
      fetchData(); 
    }, [])
  return (
     
      <View style={styles.container}>
        {/* <Button title="Add" onPress={ () => dispatch(contactAdded(data))}/> */}
          <ScrollView style={styles.scrollStyle} >
          {/* {console.log(data)} */}
          { 
              // state.data && state.data.map(data =>
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
          </ScrollView>

          <FABGroup navigation={navigation} screenName="AddEntryScreen"/>
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

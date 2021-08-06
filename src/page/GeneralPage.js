import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import FABGroup from '../components/FAB';
import { useTheme, useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { selectData, dataInit } from '../reducers/dataReducer';
import { selectFields, DB_PATH } from '../reducers/fieldReducer';


export default function GeneralScreen({ navigation, name }) {

  const { colors } = useTheme();
  const theme = useTheme();
  const route = useRoute();
  const appData = useSelector(selectData);
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState();
  const fields = useSelector(selectFields);

    const fetchData = (table) => {
      const db = SQLite.openDatabase(DB_PATH);
      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM "${table}"`, null, 
          (txObj, { rows: { _array } }) =>  dispatch(dataInit({data:_array, type: table}))  ,
          (txObj, error) => console.log('Error ', error)
          ) 
      })
    }

    const Init = () => {
        
        let order;
        fields.map((field) => {
          if (field.name == route.name){
            order = field.fieldOrder;
            
          }
        });
        setItemName(order);
        // console.log(order);
        // console.log(itemName);
    }

    useEffect(() => {
        Init();
        fetchData(route.name);
    }, [])

  return (
     
      <View style={styles.container}>
       <ScrollView style={styles.scrollStyle} >
         {/* {console.log(fields.f)} */}
       { appData[route.name] && appData[route.name].map((data) => (
         <TouchableWithoutFeedback key={data.id} onPress={() => navigation.navigate('GenItemScreen', {data:data, type:route.name})}>
          <View  style={styles.itemStyle}>
            <Text style={styles.TextStyle}>{data[itemName[0]]}</Text>
          </View>
         </TouchableWithoutFeedback>
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
  itemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#222',
    padding: 10,
    marginBottom: 5,
  }
});

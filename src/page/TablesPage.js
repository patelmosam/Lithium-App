import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import FABGroup from '../components/FAB';
import { useTheme } from '@react-navigation/native';
import { selectTables, deleteDB } from '../reducers/tableReducer';

export default function TablesScreen({ navigation, route }) {

  const { colors } = useTheme();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);
  const [dbData, setDbData] = useState({});
  const handlePress = () => setExpanded(!expanded);
  const dbList = useSelector(selectTables)
  const dBName = route.params.dBName;

  const handleDelete = () => {
    dispatch(deleteDB({dBName:dBName}));
    navigation.goBack();
  }

  const handelchange = () => {
    if(dbList[dBName])
      setDbData(dbList[dBName]);
   
  }

  useEffect(() => {
    handelchange();
  },[dbList]);

  return (
     
      <View style={styles.container}>
        <ScrollView style={styles.scrollStyle} >
         
          <View >
            
            { Object.keys(dbData).map((table) => (
              <TouchableWithoutFeedback key={table} onPress={() => navigation.navigate('TableItemScreem', {tableName:table, table: dbList[dBName][table], dbName:dBName})}>
              <View key={table} style={styles.displayItem}>
                <Text style={styles.TextStyle}> {table}</Text>
              </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
     
          
          </ScrollView>
          <Button theme={theme} style={{margin: 10}} mode="contained" onPress={handleDelete}>
            Delete Database
          </Button>
          <FABGroup navigation={navigation} screenName="TableAddScreen" dbName={dBName} /> 
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
  displayItem: {
    borderRadius: 15,
    backgroundColor: '#222',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  }
});

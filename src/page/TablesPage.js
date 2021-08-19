import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux'
import FABGroup from '../components/FAB';
import { useTheme } from '@react-navigation/native';
import { selectTables } from '../reducers/tableReducer';

export default function TablesScreen({ navigation }) {

  const { colors } = useTheme();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const dbList = useSelector(selectTables)

  return (
     
      <View style={styles.container}>
        <ScrollView style={styles.scrollStyle} >
        {/* <Text style={styles.TextStyle}>Hello</Text> */}
         
          { Object.keys(dbList).map((db) => (
            <View key={db} >
              <Text style={styles.TextStyle}> {db}</Text>
              {/* <Text style={styles.TextStyle}>{JSON.stringify(field.schema)}</Text> */}
            
              {Object.keys(dbList[db]).map((table) => (
                <TouchableWithoutFeedback key={table} onPress={() => navigation.navigate('TableItemScreem', {tableName:table, table: dbList[db][table], dbName:db})}>
                <View key={table} style={styles.displayItem}>
                 <Text style={styles.TextStyle}> {table}</Text>
                </View>
                </TouchableWithoutFeedback>
            ))}
            </View>
          ))}

          </ScrollView>
          <FABGroup navigation={navigation} screenName="TableAddScreen" />
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

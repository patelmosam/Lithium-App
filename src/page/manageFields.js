import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import FABGroup from '../components/FAB';
import { useTheme } from '@react-navigation/native';
// import { InitDB } from '../shared/database';
import { selectFields } from '../reducers/fieldReducer';

export default function manageFieldsScreen({ navigation }) {

  const { colors } = useTheme();
  const theme = useTheme();

  // const [state, setState] = useState({ data: null});
  const fields = useSelector(selectFields)
//   const dispatch = useDispatch()

    // const Init = () => {
    //     console.log('initialized!!')
    // }

    // useEffect(() => {
    //     Init();
    // }, [])

  return (
     
      <View style={styles.container}>
        <ScrollView style={styles.scrollStyle} >
        {/* <Text style={styles.TextStyle}>Hello</Text> */}
         
          { fields.map((field) => (
            <View key={field.id} style={styles.displayItem}>
              <Text style={styles.TextStyle}> {field.name}</Text>
              <Text style={styles.TextStyle}>{JSON.stringify(field.schema)}</Text>
            </View>
          ))}

        
       
          </ScrollView>
          <FABGroup navigation={navigation} screenName="newFieldScreen" />
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
    borderRadius: 20,
    backgroundColor: '#222',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  }
});

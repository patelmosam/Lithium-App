import React, { useState, useEffect } from 'react';
import {StyleSheet, View } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux'
// import FABGroup from '../components/FAB';
import { useTheme } from '@react-navigation/native';
import { InitDB } from '../shared/database';


export default function GeneralScreen({ navigation }) {

  const { colors } = useTheme();
  const theme = useTheme();

  // const [state, setState] = useState({ data: null});
//   const contacts = useSelector(selectContacts)
//   const dispatch = useDispatch()

    const Init = () => {
        console.log('initialized!!')
    }

    useEffect(() => {
        Init();
    }, [])

  return (
     
      <View style={styles.container}>
       

          {/* <FABGroup navigation={navigation} /> */}
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

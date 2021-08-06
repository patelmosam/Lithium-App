import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Button,
  ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';


export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const theme = useTheme();

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

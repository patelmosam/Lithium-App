import React from 'react';
import {StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';


export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const theme = useTheme();

  return (
     
      <View style={styles.container}>
        
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

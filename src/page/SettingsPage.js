import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';


function SettingsScreen({ navigation }) {
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
});

export default SettingsScreen;
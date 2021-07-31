import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native';
// import { InitDB } from '../shared/database';
import { TextInput, Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { AddField } from '../reducers/fieldReducer';

export default function newFieldScreen({ navigation }) {

  const { colors } = useTheme();
  const theme = useTheme();

  const dispatch = useDispatch();
  // const fields = useSelector(selectFields);

  const [name, setName] = useState("");

  const [keys, setKeys] = useState([0]);
  const [fieldName, setfieldName] = useState({0:''});
  const [selectedType, setSelectedType] = useState({0:null});
  

  const additem = () => {
      setfieldName({...fieldName, [keys.length]:''});
      setSelectedType({...selectedType, [keys.length]:null});
      let newKeys = keys;
      newKeys.push(keys.length);
      setKeys(newKeys);
      
    }

  const updateData = () => {
     let fields = {};

     for (let i in fieldName){
        fields[fieldName[i]] = selectedType[i];
     }
     dispatch(AddField({'id':0, 'name':name, 'schema':fields}));
     navigation.goBack();
  }

  return (
     
    <View style={styles.container}>
        <ScrollView style={styles.scrollStyle} >
        <View style={styles.inputStyle}>
            <TextInput
              label="Display Name"
              value={name}
              model='flat'
              onChangeText={text => setName(text)}
            />
        </View>
        {/* {console.log('field',state.fields)} */}
        {keys.map((key) => (
            <View key={key} style={styles.inputItem}>
                <View style={styles.typeName}>
                    <TextInput
                        label="Sub-Field"
                        value={fieldName[key]}
                        mode="outlined"
                        onChangeText={text => setfieldName({...fieldName, [key]: text})}
                    />
                </View>
                <View style={styles.dropDown}>
                
                   <Picker
                    label='Type'
                    mode='dropdown'
                    dropdownIconColor='white'
                    selectedValue={selectedType[key]}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedType({...selectedType, [key]:itemValue})
                    }>
                    
                    <Picker.Item label="Text" value="TEXT" />
                    <Picker.Item label="Number" value="INTEGER" />
                  </Picker>
                </View>
            </View>
        ))}
        <Button  onPress={() => additem()} mode="contained"> Add </Button>
        <View style={styles.buttonView}>
            <View style={styles.cancelButton} >
            <Button color='red' onPress={() => navigation.goBack()} mode="contained"> Cancel </Button>
            </View>
            <View style={styles.saveButton} >
            <Button  onPress={() => updateData()} mode="contained"> Save </Button>
            </View>
        </View>
        </ScrollView>
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
  inputStyle: {
    margin: 5,
    flex: 1,
  },  
  inputItem:{
    justifyContent: 'space-around',
      flexDirection: 'row',
  },
  typeName:{
    alignSelf:'stretch',
    flex: 1,
  },
  dropDown:{
    alignSelf:'stretch',
    flex: 1,
  },
  pickerStyle:{
    alignSelf:'stretch',
    flex: 1,
    color: 'white',
  },
  buttonView: {
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
    // backgroundColor:'#fff',
  },
  saveButton: {
    // color: 'blue',
    width: '20%',
    marginLeft: 40
  },
  cancelButton: {
    width: '28%',
    marginRight: 40,
    
  }  
});

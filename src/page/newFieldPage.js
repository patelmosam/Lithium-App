import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux'
// import FABGroup from '../components/FAB';
import { useTheme } from '@react-navigation/native';
import { InitDB } from '../shared/database';
import { TextInput, Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import {Picker} from '@react-native-picker/picker';

export default function newFieldScreen({ navigation }) {

  const { colors } = useTheme();
  const theme = useTheme();

  const [name, setName] = useState(null);

  const [keys, setKeys] = useState([0]);
  const [fieldName, setfieldName] = useState({0:''});
  const [selectedType, setSelectedType] = useState({0:null});
  
  // let fields = [{key:0, fieldName: '', fieldType: null}]
//   const contacts = useSelector(selectContacts)
//   const dispatch = useDispatch()
    // useEffect(()=>{
    //   console.log(keys, fieldName, selectedType);
    // },[selectedType, fieldName, keys])
  

    const additem = () => {
      setfieldName({...fieldName, [keys.length]:''});
      setSelectedType({...selectedType, [keys.length]:null});
      let newKeys = keys;
      newKeys.push(keys.length);
      setKeys(newKeys);
      
        // console.log(keys, fieldName, selectedType);
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
                    <Picker.Item label="Number" value="INTERGER" />
                  </Picker>
                </View>
            </View>
        ))}
        <Button  onPress={() => additem()} mode="contained"> Add </Button>
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
    
  }
});

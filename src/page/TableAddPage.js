import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { AddTable, selectTables } from '../reducers/tableReducer';
import { dataInit } from '../reducers/dataReducer';

export default function TableAddScreen({ navigation, route }) {

  const { colors } = useTheme();
  const theme = useTheme();

  const dispatch = useDispatch();
  // const dBList = useSelector(selectTables);
  const dBName = route.params.dbName;

  const [name, setName] = useState("");
  const [keys, setKeys] = useState([0]);
  const [fieldName, setfieldName] = useState({0:''});
  const [selectedType, setSelectedType] = useState({0:null});
  // const [dBType, setdBType] = useState();

  const additem = () => {
      setfieldName({...fieldName, [keys.length]:''});
      setSelectedType({...selectedType, [keys.length]:null});
      let newKeys = keys;
      newKeys.push(keys.length);
      setKeys(newKeys);
      
    }

  const updateData = () => {
     let table = {};
     for (let i in fieldName){
        table[fieldName[i]] = selectedType[i];
     }
     dispatch(AddTable({'table':name, 'dBName':dBName, 'schema':table}));
     dispatch(dataInit({table:name, db:dBName, data:[]}));
     navigation.goBack();
  }

  return (
     
    <View style={styles.container}>
      <ScrollView style={styles.scrollStyle} >

        <View style={styles.displayItem}>
          <View style={{justifyContent:'center'}}>
            <Text style={styles.dbTitle}>Database :</Text>
          </View>
          <View style={{justifyContent:'center',alignItems:'center', width:'60%'}}>
            <Text style={styles.dbName}>  {dBName}</Text>
          </View>
        </View>

        <View style={styles.inputStyle}>
            <TextInput
              label="Table Name"
              value={name}
              model='flat'
              onChangeText={text => setName(text)}
            />
        </View>

        {keys.map((key) => (
            <View key={key} style={styles.inputItem}>
                <View style={styles.typeName}>
                    <TextInput
                        label="Column"
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
        <Button  onPress={() => additem()} > Add </Button>
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
    
  },
  displayItem: {
    margin: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  dbTitle: {
    color: '#fff',
    fontSize: 16,
  },   
  dbName: {
    color: '#fff',
    fontSize: 16,
  },     
});

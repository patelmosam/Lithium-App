import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, form } from 'react-native';
import { dataUpdate } from '../reducers/dataReducer';
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import { selectTables } from '../reducers/tableReducer';

function GenUpdateScreen({ navigation, route }) {
  const { colors } = useTheme();
  const theme = useTheme();
  const data = route.params.data;
  const tableName = route.params.tableName;
  const dbName = route.params.dbName;
  const itemList = route.params.itemList;

  const [formData, setFormData] = useState(data);
  const [forms, setForms] = useState([]);
  const tables = useSelector(selectTables);
  const dispatch = useDispatch()

  const keyboardType = {'TEXT': 'default', 'INTEGER': 'numeric'};

  const additem = () => {
    // if (formData.name != '' && formData.surname != ''){
      // dispatch(contactUpdate(formData));
      // navigation.navigate('ContactScreen', {data:formData});
    // }
    dispatch(dataUpdate({data:formData, table:tableName, db:dbName}));
    navigation.navigate('GenItemScreen', {data:formData, tableName: tableName, dbName:dbName, itemList:itemList});
  }

  const Init = () => {
    let key=0;
    let info = [];

    for (let col in tables[dbName][tableName]){
      info.push({id:key, name: col, keyboard: keyboardType[tables[dbName][tableName][col]]});
      key++;
    }
    setForms(info);
  }

    useEffect(() => {
        Init();
    },[]);

    return (
       
      <View style={styles.container}>
        <ScrollView style={styles.scrollStyle} >
          <View style={styles.circleView}>
              {/* <View style={styles.ProfilePic}>
              
              </View> */}
          </View>
          
          { forms.map((form) => ( 
            form.name == 'id' ? <View key={form.id}></View> :
            <View key={form.id} style={styles.inputStyle}>
            <TextInput
              label={form.name}
              value={formData[form.name].toString()}
              mode="outlined"
              keyboardType={form.keyboard}
              left={<TextInput.Icon name='account-outline' />}
              onChangeText={text => setFormData({...formData, [form.name]: text})}
            />
            </View>
          ))
          }

          <View style={styles.buttonView}>
            <View style={styles.cancelButton} >
            <Button color='red' onPress={() => navigation.goBack()} mode="contained"> Cancel </Button>
            </View>
            <View style={styles.saveButton} >
            <Button  onPress={() => additem()} mode="contained"> Save </Button>
            </View>
          </View>
        </ScrollView>
      </View>
     
    );
  }

export default GenUpdateScreen;

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
    // backgroundColor: '#fff'
  },
  inputStyle: {
    margin: 5,
    // borderRadius: 35,
    flex: 1,
  },
  circleView: {
    width: '100%',
    // height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ee3'
  },
  ProfilePic: {
    width: 100,
    height: 100,
    padding: 10,
    // borderWidth: 1,
    borderRadius: 60,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
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
})
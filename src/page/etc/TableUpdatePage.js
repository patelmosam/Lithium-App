import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, form } from 'react-native';
// import AppBar from '../components/AppBar';
// import { contactUpdate } from '../reducers/contactReducer';
// import { dataUpdate } from '../reducers/dataReducer';
// import { selectFields } from '../reducers/fieldReducer';
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

function TableUpdateScreen({ navigation, route }) {
  const { colors } = useTheme();
  const theme = useTheme();
  const data = route.params.data;

  const [formData, setFormData] = useState(data.fields);
  const [forms, setForms] = useState([]);
  // const fields = useSelector(selectFields);
  const dispatch = useDispatch()

  const keyboardType = {'TEXT': 'default', 'INTEGER': 'numeric'};

  const additem = () => {
    // if (formData.name != '' && formData.surname != ''){
      // dispatch(contactUpdate(formData));
      // navigation.navigate('ContactScreen', {data:formData});
    // }
    console.log(formData);
    // dispatch(dataUpdate({data:formData, type: type}));
    // navigation.navigate('GenItemScreen', {data:formData, type: type});
  }

  const Init = () => {
    let schema, order, key=0;
    let info = [];

    //TODO: use fields.filter
    fields.map((field) => {
      if (field.name == type){
          schema = field.schema;
          order = field.fieldOrder;
      }
    });
    // console.log(order);
    for(let col in order){
        info.push({id:key, name: order[col], keyboard: keyboardType[schema[order[col]]]});
        key++;
        // let test = {name: col};
        // console.log(formData[test.name]);
    }
    setForms(info);
    // console.log('info',info);
    // console.log(formData);

  }

    useEffect(() => {
        // Init();
        // console.log(data);
    },[]);

    return (
       
      <View style={styles.container}>
        <ScrollView style={styles.scrollStyle} >
         
          
          {/* { data.fieldOrder.map((key) => ( 
            <View key={key} style={styles.inputStyle}>
                <TextInput
                    label={key}
                    value={formData[key]}
                    mode="outlined"
                    keyboardType='default'
                    left={<TextInput.Icon name='account-outline' />}
                    onChangeText={text => setFormData({...formData, [key]: text})}
                />
            </View>
          ))
          } */}

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

export default TableUpdateScreen;

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
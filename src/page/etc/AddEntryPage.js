import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, form } from 'react-native';
// import AppBar from '../components/AppBar';
// import { contactAdded, selectContacts } from '../reducers/contactReducer';
import { useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

function AddEntryScreen({ navigation }) {
  const { colors } = useTheme();
  const theme = useTheme();
  const [formData, setFormData] = useState({name:'', surname:'', phone_no:'', gander:'', discription:''});
  // const [text, setText] = useState('');
  const dispatch = useDispatch()


  const additem = () => {
    if (formData.name != '' && formData.surname != ''){
      dispatch(contactAdded(formData));
      navigation.goBack();
    }
  }

    return (
       
      <View style={styles.container}>
        <ScrollView style={styles.scrollStyle} >
          <View style={styles.circleView}>
              <View style={styles.ProfilePic}>
              
              </View>
          </View>
          <View style={styles.inputStyle}>
          {/* <form onSubmit={additem}> */}
            <TextInput
              label="First Name"
              value={formData.name}
              mode="outlined"
              left={<TextInput.Icon name='account-outline' />}
              onChangeText={text => setFormData({...formData, name: text})}
            />

            <TextInput
              label="Last Name"
              value={formData.surname}
              mode="outlined"
              left={<TextInput.Icon name='account-outline' />}
              onChangeText={text => setFormData({...formData, surname: text})}
            />

            <TextInput
              label="Phone No"
              value={formData.phone_no}
              mode="outlined"
              keyboardType = 'numeric'
              left={<TextInput.Icon name='account-outline' />}
              onChangeText={text => setFormData({...formData, phone_no: text})}
            />

            <TextInput
              label="Gender"
              value={formData.gander}
              mode="outlined"
              left={<TextInput.Icon name='account-outline' />}
              onChangeText={text => setFormData({...formData, gander: text})}
            />
            <TextInput
              label="Discription"
              value={formData.discription}
              mode="outlined"
              left={<TextInput.Icon name='account-outline' />}
              onChangeText={text => setFormData({...formData, discription: text})}
            />
          {/* </form> */}
          </View>
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

export default AddEntryScreen;

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
import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { selectTables, newDB } from '../reducers/tableReducer';
 
function DatabaseScreen({ navigation }) {
  const { colors } = useTheme();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const dblist = useSelector(selectTables);
  const [dBName, setDBName] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSave = () => {
    console.log(dBName);
    dispatch(newDB({dBName: dBName}));
    hideModal();
    setDBName("");
  }

  return (
     <View style={styles.container}>
       <ScrollView style={styles.scrollStyle} >
          {Object.keys(dblist).map((db) => (
            // <Text style={styles.textStyle}> {Object.keys(db)[0]} </Text>
            <TouchableWithoutFeedback key={db} >
              <View  style={styles.itemStyle}>
                <Text style={styles.TextStyle}>{db}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
       </ScrollView>
      <Provider>
        <Portal>
          <Modal visible={visible} theme={theme} style={styles.modelStyle} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
            <Text style={styles.TextStyle} >New Database</Text>
              <TextInput
                  theme={theme}
                  label="Database Name"
                  value={dBName}
                  mode="outlined"
                  onChangeText={text => setDBName(text)}
              />
              <View style={{alignItems:'flex-end'}}> 
                <Button style={{marginTop: 10, width: '30%'}} 
                  mode="contained" onPress={handleSave}>
                  Save
                </Button>
              </View>
          </Modal>
        </Portal>
        <Button style={{marginTop: 10}} mode="contained" onPress={showModal}>
        New Database
        </Button>
    </Provider>
    
  </View>
  );
}

export default DatabaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  scrollStyle: {
    alignSelf: 'flex-start',
    width: '100%',
    height: '85%',
    marginTop: 10,
    // backgroundColor: '#fff',
  },
  modelStyle: {
    justifyContent: 'center'
  },
  containerStyle : {
    backgroundColor: '#333333', 
    padding: 15,
    margin: 10,
    borderRadius: 15,
  },
  TextStyle: {
    color: '#fff',
    fontSize: 16,
  },  
  itemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#222',
    padding: 10,
    margin: 5,

  }
});
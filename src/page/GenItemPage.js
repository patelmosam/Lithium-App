import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux'
import { dataDelete } from '../reducers/dataReducer';
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-paper';

export default function GenItemScreen({ navigation, route }) {
    const { colors } = useTheme();
    const theme = useTheme();
    const dispatch = useDispatch();
    const data = route.params.data;
    const tableName = route.params.tableName;
    const itemList = route.params.col;
    const dbName = route.params.dbName;

    const deleteData = (id) => {
        dispatch(dataDelete({id:id, table:tableName, db:dbName}));
        navigation.goBack();
    }

  return (
     
      <View style={styles.container}>
        <ScrollView style={styles.scrollStyle} >
         
        {
            itemList.map((key) => (
                key == 'id' ? <View key={key}></View> :
                <DisplayItem key={key} type={key} data={data[key]}/>
            ))
        }

         
      <View style={styles.buttonView}>
        <View style={styles.deleteButton}>
          <Button color='red' onPress= { () => deleteData(data.id)} mode="contained" >Delete</Button>
        </View>
        <View style={styles.editButton}>
          <Button mode="contained" onPress= { () => navigation.navigate('GenUpdateScreen', {data:data, tableName:tableName, dbName:dbName, itemList:itemList})} >Edit</Button>
        </View>
        </View>
          </ScrollView>
      </View>
    
  );
}

function DisplayItem(props){
  return (
    <View style={styles.displayItem}>
      <View style={styles.typefield}>
        <Text style={styles.TextStyle}> {props.type} </Text>
      </View>
      <View style={styles.datafield}>
        <Text style={styles.TextStyle}> {props.data} </Text>
      </View>
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
    // backgroundColor: '#fff'
  },
  circleView: {
    width: '100%',
    // height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
  defaultDP: {
    fontSize: 55,
    fontWeight: 'bold',
    color: 'purple',
  },
  typefield:{
    borderWidth: 2,
    alignSelf:'stretch',
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#222'
  },
  datafield: {
    borderWidth: 2,
    flex: 1,
    alignSelf:'stretch',
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#222',
    paddingLeft: 20,
    marginLeft: 5,
  },
  TextStyle: {
    color: '#fff',
    fontSize: 16,
  },
  buttonView: {
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
    // backgroundColor:'#fff',
    
  },
  editButton: {
    // color: 'blue',
    width: '20%',
    marginLeft: 40
  },
  deleteButton: {
    width: '28%',
    marginRight: 40,
    
  },  
  displayItem: {
    // flex: 1,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-around'
  }
});

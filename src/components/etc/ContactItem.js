import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { useTheme } from '@react-navigation/native';
// import { Button } from 'react-native-paper';

export default function ContactItem({ data }){
    const { colors } = useTheme();
    const theme = useTheme();
    
    return (
    <View key={data.id} style={styles.listStyle} >
        <View style={styles.circle}>
            <Text style={styles.circleText} >{data.name[0]}</Text>
        </View>
        <View style={styles.textArea}>
            <Text style={styles.textStyle}>
                {data.name} {data.surname} 
            </Text>
            <Text style={styles.subTextStyle}>
            {data.phone_no}  </Text>
        </View>
        {/* <Button title="Delete" onPress={() => deleteID(data.id)}/> */}
    </View>
    );
}

const styles = StyleSheet.create({
    listStyle: {
        width: '95%',
        borderWidth: 1,
        alignSelf: "flex-start",
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: '#222',
        borderColor: '#222',
        borderRadius: 25,
        marginVertical: 2,
        marginHorizontal: 8,
      },
    textArea: {
        paddingHorizontal: 20,
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
      },
    subTextStyle: {
        fontSize: 13,
        color: 'gray'
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#60aec2',
        backgroundColor: '#60aec2',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingLeft: 20,
    },
    circleText: {
        fontSize:20, 
        fontWeight:'bold',
        
    }
});